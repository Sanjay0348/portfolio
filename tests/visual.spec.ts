import { expect, test } from "@playwright/test";

test("visual review of dark and light layouts", async ({ page }, testInfo) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await page.evaluate(() => document.fonts.ready);
  for (const section of await page.locator(".site-section").all()) {
    await section.scrollIntoViewIfNeeded();
  }
  for (const item of await page
    .locator(".project-card, .dna-layer, .experience-row, .impact-item")
    .all()) {
    await item.scrollIntoViewIfNeeded();
  }
  await page.locator(".contact-panel").scrollIntoViewIfNeeded();
  await page.evaluate(() => window.scrollTo(0, 0));
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await page.screenshot({
    path: `artifacts/${testInfo.project.name}-hero.png`,
    scale: "css",
  });
  await page.screenshot({
    path: `artifacts/${testInfo.project.name}-dark.png`,
    fullPage: true,
    scale: "css",
  });
  await page.getByRole("button", { name: "Switch to light theme" }).click();
  await page.screenshot({
    path: `artifacts/${testInfo.project.name}-light.png`,
    fullPage: true,
    scale: "css",
  });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  if (testInfo.project.name === "mobile") {
    await page.setViewportSize({ width: 320, height: 740 });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await page.screenshot({
      path: "artifacts/mobile-narrow.png",
      fullPage: true,
      scale: "css",
    });
  }
});
