import * as fs from 'fs'
import * as path from 'path'
import puppeteer from 'puppeteer'

async function printPdf() {
  // Create a browser instance
  const browser = await puppeteer.launch()

  // Create a new page
  const page = await browser.newPage()

  // Get HTML content from HTML
  const html = fs.readFileSync(path.join(__dirname, 'sample.html'), 'utf8')
  await page.setContent(html, { waitUntil: 'domcontentloaded' })

  // To reflect CSS used for screens instead of print
  await page.emulateMediaType('screen')

  // Download the PDF
  await page.pdf({
    path: 'result.pdf',
    margin: { top: '100px', right: '50px', bottom: '100px', left: '50px' },
    printBackground: true,
    format: 'A4',
  })

  // Close the browser instance
  await browser.close()
}

printPdf()
