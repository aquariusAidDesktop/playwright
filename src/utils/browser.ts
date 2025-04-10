import { chromium } from "playwright";
import { newInjectedContext } from "fingerprint-injector";
import fs from "fs";

const sessionPath = "./sessions/session1.json";
const sessionExists = fs.existsSync(sessionPath);

export async function getBrowserPage() {
  const browser = await chromium.launch({ headless: false });

  const context = await newInjectedContext(browser, {
    fingerprintOptions: {
      devices: ["desktop"],
      operatingSystems: ["windows"],
      locales: ["ru-RU"],
      screen: {
        minWidth: 1366,
        maxWidth: 1366,
        minHeight: 768,
        maxHeight: 768,
      },
    },
    newContextOptions: sessionExists
      ? { storageState: sessionPath }
      : undefined,
  });

  const page = await context.newPage();
  await page.goto("https://web.telegram.org");

  if (!sessionExists) {
    console.log("🔐 Войдите вручную, сессия будет сохранена через 1 минуту");
    await page.waitForTimeout(60_000);
    await context.storageState({ path: sessionPath });
    console.log("✅ Сессия сохранена в", sessionPath);
  } else {
    console.log("✅ Загружена существующая сессия:", sessionPath);
  }

  return page;
}
