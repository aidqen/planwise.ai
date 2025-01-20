import puppeteer from 'puppeteer';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url) {
    return new Response(
      JSON.stringify({ error: 'Missing URL parameter' }),
      { status: 400 }
    );
  }

  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();

    await page.setViewport({
      width: 1920,
      height: 1080,
      deviceScaleFactor: 3, // High DPI
    });

    await page.goto(url, {
      waitUntil: 'networkidle2',
    });

    // Replace waitForTimeout with setTimeout-based approach if needed
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const screenshot = await page.screenshot({
      type: 'png',
      fullPage: true,
    });

    await browser.close();

    return new Response(screenshot, {
      headers: {
        'Content-Type': 'image/png',
        'Content-Disposition': 'attachment; filename="screenshot.png"',
      },
    });
  } catch (error) {
    console.error('Error capturing screenshot:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to capture screenshot' }),
      { status: 500 }
    );
  }
}
