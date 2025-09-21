// services/googleCalendarBatch.service.js
import { getToken } from "./googleAuth.service";

// ───────────────────────────────────────────────────────────────────────────────
// utils
const isUnauthorized = (e) => {
  if (!e) return false;
  const s = e.code ?? e.status ?? e?.response?.status;
  return s === 401 || s === 403; // 403 can show up on expired/invalid tokens in practice
};

const formatHHMM = (iso, timeZone) => {
  if (!iso) return null;
  try {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return null;
    const fmt = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone,
    });
    return fmt.format(d);
  } catch {
    return null;
  }
};

const mapEvent = (event, timeZone, calendarId) => ({
  id: event.id,
  title: event.summary ?? "",
  start: event.start?.dateTime
    ? formatHHMM(event.start.dateTime, timeZone)
    : event.start?.date
    ? "00:00"
    : null,
  end: event.end?.dateTime
    ? formatHHMM(event.end.dateTime, timeZone)
    : event.end?.date
    ? "23:59"
    : null,
  location: event.location ?? null,
  attendees: event.attendees ?? [],
  hangoutLink: event.hangoutLink ?? null,
  calendarId,
});

// ───────────────────────────────────────────────────────────────────────────────
// low-level HTTP helpers

async function httpJson(url, accessToken, init = {}) {
  const res = await fetch(url, {
    ...init,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      ...(init.headers || {}),
    },
  });
  if (!res.ok) {
    const err = new Error(`HTTP ${res.status} for ${url}`);
    err.status = res.status;
    err.body = await safeText(res);
    throw err;
  }
  return res.json();
}

const safeText = (res) =>
  res
    .text()
    .then((t) => t)
    .catch(() => "");

// ───────────────────────────────────────────────────────────────────────────────
// calendar list

export async function fetchUserCalendars(accessToken) {
  const data = await httpJson(
    "https://www.googleapis.com/calendar/v3/users/me/calendarList?maxResults=250&fields=items(id,summary,primary,selected,accessRole,backgroundColor,foregroundColor)",
    accessToken
  );

  return (data.items ?? []).map((c) => ({
    id: c.id,
    summary: c.summary || "",
    primary: Boolean(c.primary),
    selected: c.selected !== false,
    accessRole: c.accessRole,
    backgroundColor: c.backgroundColor || null,
    foregroundColor: c.foregroundColor || null,
  }));
}

// ───────────────────────────────────────────────────────────────────────────────
// batch events.list

function buildBatchBody({ calendarIds, timeMin, timeMax, timeZone }) {
  // Per Google: each part is an application/http request with only the PATH. Limit 1000 parts per batch.
  // Max page size for events.list is 2500; use single page per calendar for a single-day window.
  // Ref: docs cited below.
  const boundary = `batch_${crypto.randomUUID()}`;
  const parts = calendarIds.map((id, idx) => {
    const qs = new URLSearchParams({
      singleEvents: "true",
      orderBy: "startTime",
      maxResults: "2500",
      timeMin,
      timeMax,
      timeZone,
      fields:
        "items(id,summary,start,end,location,attendees,hangoutLink),nextPageToken",
    }).toString();

    return [
      `--${boundary}`,
      "Content-Type: application/http",
      `Content-ID: <item${idx}:${id}>`,
      "",
      `GET /calendar/v3/calendars/${encodeURIComponent(id)}/events?${qs}`,
      "",
    ].join("\r\n");
  });

  const body = parts.join("\r\n") + `\r\n--${boundary}--`;
  return { boundary, body };
}

function parseBatchResponse(raw, contentType) {
  // Extract response boundary
  const m = /boundary=([^;]+)/i.exec(contentType || "");
  if (!m) throw new Error("Missing batch boundary in response");
  const boundary = m[1];

  const chunks = raw.split(`--${boundary}`).filter((c) => c.trim());
  const results = [];

  for (const chunk of chunks) {
    // Match response Content-ID to map back to calendarId
    const idMatch = /Content-ID:\s*<response-item(\d+):([^>]+)>/i.exec(chunk);
    // HTTP status and JSON body
    const statusMatch = /HTTP\/1\.\d\s+(\d{3})/i.exec(chunk);
    const jsonMatch = /\{[\s\S]*\}\s*$/.exec(chunk);

    if (!statusMatch) continue;
    const status = Number(statusMatch[1]);
    const calendarId = idMatch ? idMatch[2] : null;

    let json = null;
    if (jsonMatch) {
      try {
        json = JSON.parse(jsonMatch[0]);
      } catch {
        json = null;
      }
    }

    results.push({ status, calendarId, json });
  }

  return results;
}

// ───────────────────────────────────────────────────────────────────────────────
// token wrapper

async function withAccessToken(run) {
  const first = await getToken();
  try {
    return await run(first.accessToken);
  } catch (e) {
    if (!isUnauthorized(e)) throw e;
    const refreshed = await getToken({ forceRefresh: true });
    return run(refreshed.accessToken);
  }
}

// ───────────────────────────────────────────────────────────────────────────────
// public API

/**
 * Fetch events for a given ISO date (YYYY-MM-DD) across all user calendars via one batch call.
 */
export async function fetchGoogleCalendarEventsByDate(date) {
  if (!date) throw new Error("date is required (YYYY-MM-DD)");

  return withAccessToken(async (accessToken) => {
    const timeZone =
      Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
    const start = new Date(`${date}T00:00:00`);
    const end = new Date(`${date}T23:59:59`);

    // 1) calendar IDs
    const calendars = await fetchUserCalendars(accessToken);
    const ids = Array.from(
      new Set(
        [
          "primary",
          ...calendars
            .filter((c) => c.selected !== false) // mimic Calendar UI visible list
            .map((c) => c.id),
        ].filter(Boolean)
      )
    );

    // 2) build batch body
    const { boundary, body } = buildBatchBody({
      calendarIds: ids,
      timeMin: start.toISOString(),
      timeMax: end.toISOString(),
      timeZone,
    });

    // 3) send one POST to the Calendar batch endpoint
    const res = await fetch("https://www.googleapis.com/batch/calendar/v3", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": `multipart/mixed; boundary=${boundary}`,
        Accept: "application/json",
      },
      body,
    });

    if (res.status === 401 || res.status === 403) {
      const err = new Error(`HTTP ${res.status} for batch call`);
      err.status = res.status;
      err.body = await safeText(res);
      throw err; // triggers refresh in withAccessToken
    }

    const raw = await res.text();
    const ctype = res.headers.get("content-type") || "";
    const parts = parseBatchResponse(raw, ctype);

    // 4) collect and normalize
    const events = [];
    for (const part of parts) {
      if (part.status !== 200 || !part.json) continue;
      const calendarId = part.calendarId || "unknown";
      for (const ev of part.json.items ?? []) {
        events.push(mapEvent(ev, timeZone, calendarId));
      }
    }

    // 5) de-dupe by event id, then sort by start
    const seen = new Set();
    const deduped = [];
    for (const e of events) {
      if (!e?.id || seen.has(e.id)) continue;
      seen.add(e.id);
      deduped.push(e);
    }

    const toMillis = (time) => {
      if (!time) return 0;
      const parsed = new Date(`${date}T${time}`);
      return Number.isNaN(parsed.getTime()) ? 0 : parsed.getTime();
    };
    deduped.sort((a, b) => toMillis(a.start) - toMillis(b.start));

    return deduped;
  });
}
