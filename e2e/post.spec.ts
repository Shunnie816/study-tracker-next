import { expect, test } from "@playwright/test";
import { clearFirestore, seedTextbook } from "./helpers/firestore";

test.beforeEach(async () => {
  await clearFirestore();
  await seedTextbook("Python入門");
});

test("学習記録を投稿すると posts 一覧に反映される", async ({ page }) => {
  await page.goto("/");

  // 教材セレクトに Python入門 が表示されるまでリトライしながら選択
  await expect(async () => {
    const isOpen = await page.getByRole("listbox").isVisible();
    if (isOpen) await page.keyboard.press("Escape");
    await page.getByLabel("教材").click();
    await expect(
      page.getByRole("option", { name: "Python入門" })
    ).toBeVisible({ timeout: 2_000 });
  }).toPass({ timeout: 15_000 });

  await page.getByRole("option", { name: "Python入門" }).click();

  // 時間選択
  await page.getByLabel("時間").click();
  await page.getByRole("option", { name: "1", exact: true }).click();

  // 分選択
  await page.getByLabel("分").click();
  await page.getByRole("option", { name: "30", exact: true }).click();

  // 学習内容入力
  await page.getByLabel("学習内容").fill("変数と関数について学習した");

  // 送信
  await page.getByRole("button", { name: "確定" }).click();

  await expect(page.getByText("記録完了！")).toBeVisible();

  // posts ページに反映されているか確認
  await page.goto("/posts");
  await expect(page.getByText("変数と関数について学習した")).toBeVisible();
  await expect(page.getByText("Python入門")).toBeVisible();
});
