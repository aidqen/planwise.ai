
import { formatISO } from "date-fns";
import { toZonedTime } from "date-fns-tz";

export function hexToRgba(hex, opacity) {

  hex = hex.replace('#', '');

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

export function makeId(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}


export function convertToGoogleTimestamp(date, time, timeZone) {
  // Combine date and time into a single string
  const dateTimeString = `${date}T${time}:00`;

  // Convert to a Date object
  const utcDate = new Date(dateTimeString);

  // Convert UTC date to the specified time zone
  const zonedDate = toZonedTime(utcDate, timeZone);

  // Format the zoned date to ISO 8601 string with time zone offset
  return formatISO(zonedDate, { representation: "complete" });
}