import { expect, test } from "@playwright/test";

const CANONICAL_CASES = [
  { path: "/", canonical: "https://study-tracker.nokono.net" },
  { path: "/posts", canonical: "https://study-tracker.nokono.net/posts" },
  { path: "/register", canonical: "https://study-tracker.nokono.net/register" },
  {
    path: "/study-log",
    canonical: "https://study-tracker.nokono.net/study-log",
  },
];

for (const { path, canonical } of CANONICAL_CASES) {
  test(`${path} ページの canonical URL が新ドメイン nokono.net を指す`, async ({
    page,
  }) => {
    await page.goto(path);

    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      canonical
    );
  });
}
