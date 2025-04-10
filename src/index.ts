import { chromium } from "playwright";
import { newInjectedContext } from "fingerprint-injector";
import fs from "fs";

const sessionPath = "./sessions/session1.json";
const sessionExists = fs.existsSync(sessionPath);

async function startBrowser() {
  const browser = await chromium.launch({ headless: false });

  const context = await newInjectedContext(browser, {
    fingerprintOptions: {
      devices: ["desktop"],
      operatingSystems: ["windows"],
      locales: ["ru-RU"],
      screen: {
        minWidth: 1280,
        maxWidth: 1280,
        minHeight: 680,
        maxHeight: 680,
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

async function main() {
  const page = await startBrowser();

  // 🔽 Здесь будет парсинг-функционал
  console.log("🔍 Готов к парсингу!");
  await page.waitForTimeout(10000);
  await page.goto("https://web.telegram.org/k/#" + "@cristyman");

  // Закрытие браузера будет добавлено позже по необходимости
  // await page.context().browser()?.close();
}

main().catch(console.error);
