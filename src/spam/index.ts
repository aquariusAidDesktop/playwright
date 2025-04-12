import { getBrowserPage } from "../utils/browser";
import { spamToUser } from "./spamToUser";

export async function runSpam() {
  const page = await getBrowserPage();

  const targets = ["@cristyman", "@pero_pr"];

  for (const username of targets) {
    await spamToUser(page, username, "Привет! Это тест");
    await page.waitForTimeout(2_000);
  }

  console.log("✅ Спам завершён");
}
