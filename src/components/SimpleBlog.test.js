import React from "react"
import { shallow } from "enzyme"
import SimpleBlog from "./SimpleBlog"
import "../setupTest"

describe.skip("<SimpleBlog />", () => {
    it("renders content", () => {
        const blog = {
            title: "testTitle",
            author: "testAuthor",
            likes: 2,
        }

        const simpleBlogComponent = shallow(<SimpleBlog blog={blog} onClick={null} /> )


        const infoDiv = simpleBlogComponent.find(".info")
        const likesDiv = simpleBlogComponent.find(".likes")


        console.log(infoDiv.text())
        expect(infoDiv.text()).toContain(`${blog.title} ${blog.author}`)
        expect(likesDiv.text()).toContain(`blog has ${blog.likes} likes`)



    })
    it("Recognizes Clicks", () => {
        const blog = {
            title: "testTitle",
            author: "testAuthor",
            likes: 2,
        }
        const mockHandler = jest.fn()
        const simpleBlogComponent = shallow(<SimpleBlog blog={blog} onClick={mockHandler} /> )

        const button = simpleBlogComponent.find("button")
        button.simulate("click")
        button.simulate("click")
        expect(mockHandler.mock.calls.length).toBe(2)
    })
})