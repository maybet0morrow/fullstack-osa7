import React from "react"

import BlogForm from "./BlogForm"
import UserList from "./UserList"
import Togglable from "./Togglable"



const UserPage = () => {
    //Mikä ton create napin pitäs olla? create blog? Create user? Pitäisikö sellainen toiminnallisuus olla? Ja että sitä voi käyttää pitää olla toisella userilla sisällä???
    return (
        <div >
            <br />
            <br />
            <Togglable buttonLabel={"New Blog"} ref={component => this.blogForm = component}>
                <h2> Create a new Blog </h2>
                <BlogForm />
            </Togglable>
            <br />
            <br />
            <UserList />
        </div>
    )
}


export default UserPage