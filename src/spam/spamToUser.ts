import { Page } from "playwright";

export async function spamToUser(
  page: Page,
  username: string,
  message: string
) {
  const url = `https://web.telegram.org/k/#${username}`;
  await page.goto(url, { waitUntil: "domcontentloaded" });
  console.log(`📨 Открыт чат с ${username}`);

  try {
    await page.waitForTimeout(3_000);
    const inputLocator = page.locator('div[contenteditable="true"]').first();
    await inputLocator.waitFor({ timeout: 10_000 });

    await inputLocator.pressSequentially(message);

    await page.keyboard.press("Enter");

    console.log(`✅ Сообщение отправлено: ${username}`);
  } catch (err) {
    if (err instanceof Error) {
      console.log(`❌ Ошибка отправки для ${username}:`, err.message);
    } else {
      console.log(`❌ Неизвестная ошибка при отправке для ${username}:`, err);
    }
  }
}
