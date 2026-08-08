const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
  await page.goto('http://localhost:3000');
  await page.waitForTimeout(2000);
  const html = await page.content();
  if (html.includes('กำลังโหลด')) {
    console.log('STILL LOADING');
  } else {
    console.log('LOADED');
  }
  await browser.close();
})();
