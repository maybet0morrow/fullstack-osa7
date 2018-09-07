import React from "react"


import BlogForm from "./BlogForm"

import BlogList from "./BlogList"
import Togglable from "./Togglable"



const MainPage = () => {
    return (
        <div className="visibleWhenLogged">
            <br />
            <br />
            <Togglable buttonLabel={"New Blog"} ref={component => this.blogForm = component}>
                <h2> Create a new Blog </h2>
                <BlogForm />
            </Togglable>
            <BlogList />
        </div>
    )
}

export default MainPage


