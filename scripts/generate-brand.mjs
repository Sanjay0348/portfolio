import { chromium } from "@playwright/test";
import { readFile, writeFile } from "node:fs/promises";

// Render the code-native brand assets using the same local font as the UI.
const icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect width="512" height="512" rx="104" fill="#10110f"/><rect x="50" y="50" width="412" height="412" rx="75" fill="none" stroke="#c1f77b" stroke-opacity=".3" stroke-width="4"/><g fill="none" stroke="#c1f77b" stroke-width="25" stroke-linecap="round" stroke-linejoin="round"><path d="m181 178-78 78 78 78m150-156 78 78-78 78m-45-191-60 226"/></g></svg>`;
await writeFile("public/brand.svg", icon);
const font = (
  await readFile(
    "node_modules/@fontsource/instrument-sans/files/instrument-sans-latin-600-normal.woff2",
  )
).toString("base64");
const browser = await chromium.launch({ channel: "chrome", headless: true });
try {
  const page = await browser.newPage({
    viewport: { width: 1200, height: 630 },
    deviceScaleFactor: 1,
  });
  await page.setContent(
    `<style>@font-face{font-family:Instrument;src:url(data:font/woff2;base64,${font})}*{box-sizing:border-box}body{margin:0;width:1200px;height:630px;background:#10110f;color:#f2f2eb;font-family:Instrument,Arial;position:relative;padding:55px 65px;overflow:hidden}header{display:flex;align-items:center;gap:13px;font-size:25px}header svg{width:42px;height:42px}small{font:12px monospace;letter-spacing:2px;color:#a3aa98}h1{font-size:86px;line-height:1.03;letter-spacing:-5px;margin:55px 0 25px}h1 span{color:#c1f77b}p{color:#a3aa98;font-size:22px}footer{position:absolute;bottom:38px;left:65px;right:65px;border-top:1px solid #ffffff20;padding-top:20px;display:flex;justify-content:space-between;font:11px monospace;letter-spacing:2px;color:#a3aa98}.symbol{position:absolute;right:75px;top:205px;font-size:230px;color:#c1f77b;line-height:1;transform:rotate(12deg)}.tag{position:absolute;right:65px;top:72px;border:1px solid #c1f77b50;padding:10px 13px;color:#c1f77b;font:10px monospace;border-radius:4px}</style><header>${icon}<span>sanjay.</span></header><div class="tag">AI × FULL STACK × SYSTEMS</div><h1>Ideas are cool.<br/><span>Shipping is cooler.</span></h1><p>AI systems & production software. Built by Sanjay V.</p><div class="symbol">✳</div><footer><span>FROM FIRST COMMIT TO PRODUCTION.</span><span>ENGINEER & BUILDER</span></footer>`,
  );
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: "public/social-preview.png" });
  for (const size of [192, 512]) {
    await page.setViewportSize({ width: size, height: size });
    await page.setContent(
      `<style>body{margin:0}svg{display:block;width:100vw;height:100vh}</style>${icon}`,
    );
    await page.screenshot({
      path: `public/brand-${size}.png`,
      omitBackground: true,
    });
  }
} finally {
  await browser.close();
}
