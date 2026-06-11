// Dev utility: full-page screenshot of a local page using the installed Chrome.
// Usage: node scripts/screenshot.mjs <url> <outfile> [width] [mobile]
import { chromium } from "playwright-core";

const [url = "http://localhost:3311/", out = "/tmp/shot.png", width = "1440", mobile] =
  process.argv.slice(2);

const browser = await chromium.launch({
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: true,
});
const page = await browser.newPage({
  viewport: { width: Number(width), height: mobile ? 844 : 900 },
  reducedMotion: "reduce",
  ...(mobile ? { isMobile: true, hasTouch: true } : {}),
});
await page.goto(url, { waitUntil: "networkidle" });
await page.waitForTimeout(600);
await page.screenshot({ path: out, fullPage: true });
await browser.close();
console.log("saved", out);
