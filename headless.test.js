const puppeteer = require("puppeteer")

describe("loginPage when opening http://localhost:3000/", () => {
    let browser
    let page
    beforeEach(async () => {
        browser = await puppeteer.launch()
        page = await browser.newPage()
        await page.goto("http://localhost:3000/")
        await page.evaluate(() => {
            localStorage.clear()
        })

    })
    it("renders loginScreen", async () => {
        await page.goto("http://localhost:3000/")
        const textContent = await page.$eval("body", el => el.textContent)

        expect(textContent).toContain("Kirjaudu")
    })

    it("renders mainScreen after login", async () => {

        // Couldt find a way to access other input since couldn't access it via name, + button pressing hard with Semantics Ui Button
        await page.goto("http://localhost:3000/")
        await page.type("input", "nimpio")
        await page.keyboard.press("Tab")
        await page.keyboard.type("asdasd")
        await page.click("button.ui.button")
        await page.waitFor(500)



        const textContent = await page.$eval("body", el => el.textContent)

        expect(textContent).toContain("Logged in as nimpio")

    })

    afterEach(async () => {
        await browser.close()
    })

})

describe("blogPage", () => {
    let browser
    let page
    const user = { token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ…DQzfQ.Nlr59CsHG5sa2tMI_23SYO6wPr9ssqQElsCIGydILpk", username: "nimpio", name: "Niklas Impiö" }
    beforeEach(async () => {
        browser = await puppeteer.launch()
        page = await browser.newPage()
        await page.goto("http://localhost:3000/")
        await page.evaluate(() => {
            localStorage.setItem("loggedBlogAppUser", JSON.stringify({ token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ…DQzfQ.Nlr59CsHG5sa2tMI_23SYO6wPr9ssqQElsCIGydILpk", username: "nimpio", name: "Niklas Impiö" }))
        })
    })
    it("renders blogScreen", async () => { 
        await page.goto("http://localhost:3000/blogs")
        const textContent = await page.$eval("body", el => el.textContent)


        expect(textContent).toContain("Title")
        expect(textContent).toContain("Author")
        expect(textContent).toContain("Likes")
        expect(textContent).toContain("New Blog")
    })
    it("renders togglableBlogForm", async () => {

        await page.goto("http://localhost:3000/blogs")
        await page.click("button.ui.showBlogFormButton")
        const textContent = await page.$eval("body", el => el.textContent)
        expect(textContent).toContain("Create a new Blog")

    })

    afterEach(async () => {
        await browser.close()
    })

})