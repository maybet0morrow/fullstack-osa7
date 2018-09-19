const puppeteer = require("puppeteer")

const main = async () => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto("http://localhost:3000/")
    await page.screenshot( { path: "kuva.png" } )
    await browser.close()
}

main()

describe("loginPage when opening http://localhost:3000/", () => {
    it("renders loginScreen", async () => {
        const page = await global.__BROWSER__.newPage()
        await page.goto("http://localhost:3000/")
        const textContent = await page.$eval("body", el => el.textContent)

        expect(textContent).toContain("Kirjaudu")
    })
})