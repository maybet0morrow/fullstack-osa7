import React from 'react'
import { shallow } from 'enzyme'
import Blog from './Blog'
import "../setupTest"

describe.only("<Blog />", () => {
    const blog = {
        title: "testTitle",
        author: "testAuthor",
        url: "www.test.com",
        likes: 2,
    }
    let blogComponent

    beforeEach(() => {
        blogComponent = shallow(<Blog blog={blog} updateBlog={null} deleteBlog={null} setError={null} /> )
    })
    it("before clicking name the details are hidden", () => {
        

        const simpleDiv = blogComponent.find(".simple")
        const expandedDiv = blogComponent.find(".expanded")
        expect(simpleDiv.getElement().props.style).toEqual({display:""})
        expect(expandedDiv.getElement().props.style).toEqual({display: "none"})
    })
    it("after clicking name the details are displayed", () =>{

        const simpleDiv = blogComponent.find(".simple")
        simpleDiv.simulate('click')
        
        const simpleDivAfter = blogComponent.find(".simple")
        const expandedDiv = blogComponent.find(".expanded")
        console.log(expandedDiv.getElement().props.style)
        expect(simpleDivAfter.getElement().props.style).toEqual({display:"none"})
        expect(expandedDiv.getElement().props.style).toEqual({display:""})
        
        
        
    })
    it("renders correct information", ()=> {
        const simpleDiv = blogComponent.find(".simple")
        const expandedDiv = blogComponent.find(".expanded")
        //console.log(expandedDiv.text())
        expect(simpleDiv.text()).toContain(` ${blog.title},  ${blog.author}`)
        expect(expandedDiv.text()).toContain(`${blog.title},  ${blog.author}${blog.url}${blog.likes}`)
        
    })

})