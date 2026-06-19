import { expect, test } from "@playwright/test";
import { clearFirestore, seedPost, seedTextbook } from "./helpers/firestore";

test.beforeEach(async () => {
  await clearFirestore();
});

test("投稿データがない場合、学習記録がありませんと表示される", async ({
  page,
}) => {
  await page.goto("/study-log");

  await expect(page.getByText("学習記録がありません")).toBeVisible();
});

test("投稿データがある場合、集計カードと教材別グラフが表示される", async ({
  page,
}) => {
  const textbookId = await seedTextbook("TypeScript");
  await seedPost({
    textbookId,
    textbookName: "TypeScript",
    timeMinutes: 90,
    content: "型定義を学んだ",
  });

  await page.goto("/study-log");

  await expect(page.getByText("今日")).toBeVisible();
  await expect(page.getByText("今週")).toBeVisible();
  await expect(page.getByText("累計")).toBeVisible();
  await expect(page.getByText("TypeScript")).toBeVisible();
});

test("ナビゲーションから学習統計ページに遷移できる", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("link", { name: "学習統計" }).click();

  await expect(page).toHaveURL("/study-log");
  await expect(page.getByText("教材別の学習時間")).toBeVisible();
});
