import * as fs from 'fs'
import * as path from 'path'
import puppeteer from 'puppeteer'

type TemplateArgs = {
  title: string
  description: string
  experience: string
  location: string
  skills: string[]
}

export default async function generatePdf(values: TemplateArgs) {
  const { title, description, experience, location, skills } = values
  // Create a browser instance
  const browser = await puppeteer.launch()

  // Create a new page
  const page = await browser.newPage()

  // Get HTML content from HTML
  const html = fs.readFileSync(
    path.join(__dirname, '../../assets/sample.html'),
    'utf8',
  )
  await page.setContent(html, { waitUntil: 'domcontentloaded' })

  // To reflect CSS used for screens instead of print
  await page.emulateMediaType('screen')

  await page.$eval(
    '#title',
    (el: any, value: string) => (el.innerHTML = value),
    title,
  )

  await page.$eval(
    '#location',
    (el: any, value: string) => (el.innerHTML = value),
    location,
  )

  await page.$eval(
    '#skills',
    (el: any, value: string[]) => (el.innerHTML = value.join(', ')),
    skills,
  )

  await page.$eval(
    '#experience',
    (el: any, value: string) => (el.innerHTML = value),
    experience,
  )

  await page.$eval(
    '#description',
    (el: any, value: string) => (el.innerHTML = value),
    description,
  )

  // Download the PDF
  const pdf = await page.pdf({
    margin: { top: '50px', right: '50px', bottom: '50px', left: '50px' },
    printBackground: true,
    format: 'A4',
  })

  // Close the browser instance
  await browser.close()

  return pdf
}
