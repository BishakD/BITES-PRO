const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  await page.setViewport({ width: 1440, height: 900 });

  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log('BROWSER_ERROR:', msg.text());
    }
  });

  try {
    await page.goto('http://localhost:8080', { waitUntil: 'networkidle2', timeout: 30000 });
    // Let GSAP animations and videos load
    await new Promise(r => setTimeout(r, 2000));
    
    // Evaluate if any obvious errors are present
    const errors = await page.evaluate(() => {
        return window.bitesLenis ? 'Lenis OK' : 'Lenis MISSING';
    });
    console.log(errors);

    // Save screenshot
    const outPath = path.join('C:\\Users\\bisha\\.gemini\\antigravity-ide\\brain\\25655d78-36b5-4781-bf41-f09bf2708f2a', 'screenshot.png');
    await page.screenshot({ path: outPath, fullPage: true });
    console.log('Screenshot saved to', outPath);

  } catch (e) {
    console.error('Failed:', e);
  } finally {
    await browser.close();
  }
})();
