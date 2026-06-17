import { expect, test } from "@playwright/test";
import { clearFirestore } from "./helpers/firestore";

test.beforeEach(async () => {
  await clearFirestore();
});

test("教材名を入力して登録すると一覧に反映される", async ({ page }) => {
  await page.goto("/register");

  await page.getByLabel("教材を入力").fill("テスト教材");
  await page.getByRole("button", { name: "登録する" }).click();

  await expect(page.getByText("教材登録完了！")).toBeVisible();
  await expect(page.getByText("テスト教材")).toBeVisible();
});
