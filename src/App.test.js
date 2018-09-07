import React from "react"
import { mount } from "enzyme"
import App from "./App"
import "./setupTest"
import Blog from "./components/Blog"

jest.mock("./services/blogs")
import blogService from "./services/blogs"


describe("<App />", () => {
    let app
    describe("when user is not logged", () => {
        beforeEach(() => {
            app = mount(<App />)
        })

        it("doesn't render blog list when not logged in.", () => {
            app.update()
            // dunno if this is enough to prove that blog list isn't rendering any blogs
            // Didn't find a way to access Blogs with app.find("blogListWrapper").first() that should get first blog)
            expect(app.text()).toBe("Kirjaudukäyttäjätunnussalasanakirjaudu")
            expect(app.text()).not.toContain("Esimerkki Blogi")
        })
    })
    describe("When user is logged", () => {
        beforeEach(() => {
            const user = {
                username: "testuser",
                token: "123456789",
                name: "Teuvo Testaaja"
            }
            localStorage.setItem("loggedBlogAppUser", JSON.stringify(user))
            app = mount(<App />)
        })

        it("all notes are rendered", () => {
            app.update()

            //console.log(app.text())
            const blogComponents = app.find(Blog)
            expect(blogComponents.length).toEqual(blogService.blogs.length)
            expect(app.text()).toContain(blogService.blogs[0].title)
            expect(app.text()).toContain(blogService.blogs[1].author)
        })
    })



})