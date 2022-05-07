const puppeteer = require('puppeteer')
const express = require('express')
const app = express()
const port = process.env.PORT || 1000

app.get('/', (req, res) => {
  res.send('{"name":"John" , "age":30, "city":"New York"}')
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})

async function start() {
  const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage()
  await page.goto('https://flipkart.com/', {
    waitUntil: 'networkidle2',
  })
  await page.screenshot({ path: 'google.png', fullPage: true })
  const dimensions = await page.evaluate(() => {
    return {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
      deviceScaleFactor: window.devicePixelRatio,
    }
  })

  console.log('Dimensions:', dimensions)
  // await page.pdf({ path: 'hn.pdf', format: 'a4' })
  await browser.close()
}

start()
