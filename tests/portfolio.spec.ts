import { expect, test } from "@playwright/test";

test("renders without errors and fits the viewport", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Ideas are cool.",
  );
  await expect(page.locator(".project-card")).toHaveCount(4);
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth > innerWidth,
  );
  expect(overflow).toBe(false);
  expect(errors).toEqual([]);
});

test("runs, replays, and switches simulated workflows", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await page.getByRole("button", { name: "Run workflow" }).click();
  await expect(
    page.getByRole("button", { name: "Replay workflow" }),
  ).toBeEnabled({ timeout: 8000 });
  await expect(page.locator(".trace-output")).toContainText(
    "Queued for operator review",
  );
  await page.getByRole("button", { name: "Replay workflow" }).click();
  await page.getByRole("button", { name: /Code agent/ }).click();
  await expect(page.locator(".trace-output")).toContainText("Run a sample");
  await page.getByRole("button", { name: "Run workflow" }).click();
  await expect(page.locator(".trace-output")).toContainText(
    "Patch prepared for human review",
    { timeout: 8000 },
  );
  await page.getByRole("button", { name: "Repository context" }).click();
  await expect(page.locator(".node-description")).toContainText(
    "Grounded context",
  );
});

test("filters projects and opens accessible case studies", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await page.getByRole("button", { name: /Full stack/ }).click();
  await expect(page.locator(".project-card")).toHaveCount(1);
  await page
    .getByRole("button", {
      name: "Read case study: Electronic Project Management System",
    })
    .click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(
    page.getByRole("heading", {
      name: "Electronic Project Management System",
      exact: true,
      level: 2,
    }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(
    page.getByRole("button", {
      name: "Read case study: Electronic Project Management System",
    }),
  ).toBeFocused();
  await page.getByRole("button", { name: /AI systems/ }).click();
  await expect(page.locator(".project-card")).toHaveCount(3);
  await page
    .getByRole("button", {
      name: "Read case study: AI Code Review & Auto-Fix Agent",
    })
    .click();
  await page.getByRole("button", { name: "Explore a sample review" }).click();
  await expect(page.locator("#sample-analysis li")).toHaveCount(3);
  await page.getByRole("button", { name: "Close case study" }).click();
  await expect(page.getByRole("dialog")).toHaveCount(0);
});

test("persists theme and updates toolkit on click", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await page.getByRole("button", { name: "Switch to light theme" }).click();
  await expect(page.locator(".main-container")).toHaveClass(/light-mode/);
  await page.reload({ waitUntil: "domcontentloaded" });
  await expect(page.locator(".main-container")).toHaveClass(/light-mode/);
  await page.getByRole("button", { name: "Python", exact: true }).click();
  await expect(page.locator(".dna-proof")).toContainText("FastAPI");
  await page.getByRole("button", { name: "Switch to dark theme" }).click();
  await expect(page.locator(".main-container")).toHaveClass(/dark-mode/);
});

test("navigation and assets work with reduced motion", async ({
  page,
  request,
}, testInfo) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/", { waitUntil: "domcontentloaded" });
  if (testInfo.project.name === "mobile") {
    await page.getByRole("button", { name: "Open menu" }).click();
    await page
      .getByRole("navigation", { name: "Mobile navigation" })
      .getByRole("link", { name: "Say hello" })
      .click();
    await expect(page.getByRole("button", { name: "Open menu" })).toBeVisible();
  } else {
    await page
      .getByRole("navigation", { name: "Main navigation" })
      .getByRole("link", { name: "Say hello" })
      .click();
  }
  await expect(page).toHaveURL(/#contact$/);
  await expect(
    page.getByRole("heading", { name: /Have a wild idea/ }),
  ).toBeInViewport();
  for (const asset of [
    "/Sanjay_Venakt_SV_Resume.pdf",
    "/brand.svg",
    "/social-preview.png",
    "/manifest.json",
  ]) {
    const response = await request.get(asset);
    expect(response.ok()).toBe(true);
  }
});
