const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
  page.on('requestfailed', request => console.log('REQUEST FAILED:', request.url(), request.failure().errorText));

  console.log('Navigating to live site...');
  await page.goto('https://hung-may-dap-shop.pages.dev/#shop', { waitUntil: 'networkidle2' });
  
  console.log('Page loaded. Checking for elements...');
  
  // Wait a bit to let any asynchronous errors show up
  await new Promise(r => setTimeout(r, 2000));
  
  await browser.close();
  console.log('Done.');
})();
