const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
  await page.goto('http://localhost:3000');
  await new Promise(r => setTimeout(r, 2000));
  const html = await page.content();
  if (html.includes('กำลังโหลดข้อมูลที่นั่ง')) {
    console.log('STILL LOADING');
  } else {
    console.log('LOADED');
  }
  await browser.close();
})();
