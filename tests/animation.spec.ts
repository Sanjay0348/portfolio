import { expect, test } from "@playwright/test";

test("animated experience runs a workflow to completion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect(page.locator(".hero-spark")).toHaveCSS(
    "animation-name",
    "spark-turn",
  );
  await page.getByRole("button", { name: "Run workflow" }).click();
  await expect(
    page.getByRole("button", { name: "Replay workflow" }),
  ).toBeEnabled({ timeout: 20000 });
  await expect(page.locator(".trace-output")).toContainText("trace complete");
});
