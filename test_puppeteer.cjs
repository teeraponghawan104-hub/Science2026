const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({args: ['--no-sandbox']});
  const page = await browser.newPage();
  page.on('pageerror', err => {
    console.error('Page error:', err);
  });
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.error('Console error:', msg.text());
    }
  });
  await page.goto('http://localhost:3000');
  await browser.close();
})();
