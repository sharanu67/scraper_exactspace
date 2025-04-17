const fs = require('fs');
const puppeteer = require('puppeteer');

const url = process.env.SCRAPE_URL;
console.log(`🔍 SCRAPE_URL = ${url}`);

(async () => {
  if (!url) {
    console.error('❌ Please set SCRAPE_URL environment variable.');
    process.exit(1);
  }

  console.log('🚀 Launching Puppeteer...');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    executablePath: puppeteer.executablePath(),
  });

  console.log('🌐 Opening new page...');
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'domcontentloaded' });

  console.log('📄 Scraping data...');
  const data = await page.evaluate(() => {
    return {
      title: document.title,
      heading: document.querySelector('h1')?.innerText || 'No H1 found',
    };
  });

  console.log('📝 Writing scraped data to file...');
  fs.writeFileSync('scraped_data.json', JSON.stringify(data, null, 2));
  console.log('✅ Data scraped and saved to scraped_data.json');

  await browser.close();
})();

