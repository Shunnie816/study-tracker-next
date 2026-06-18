import { expect, test } from "@playwright/test";
import { clearFirestore, seedPost, seedTextbook } from "./helpers/firestore";

test.beforeEach(async () => {
  await clearFirestore();
});

test("シードデータがある場合、posts ページに一覧が表示される", async ({
  page,
}) => {
  const textbookId = await seedTextbook("JavaScript実践");
  await seedPost({
    textbookId,
    textbookName: "JavaScript実践",
    timeMinutes: 90,
    content: "非同期処理について学んだ",
  });

  await page.goto("/posts");

  await expect(page.getByText("非同期処理について学んだ")).toBeVisible();
  await expect(page.getByText("JavaScript実践")).toBeVisible();
});

test("投稿データがない場合、空状態メッセージが表示される", async ({ page }) => {
  await page.goto("/posts");

  await expect(page.getByText("まだ投稿データがありません。")).toBeVisible();
});
