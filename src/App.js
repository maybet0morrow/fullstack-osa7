import React from "react"

import blogService from "./services/blogs"

import BlogForm from "./components/BlogForm"
import Notification from "./components/Notification"
import LoginForm from "./components/LoginForm"
import BlogList from "./components/BlogList"
import Togglable from "./components/Togglable"

import blogReducer, { initBlogs } from "./reducers/blogReducer"
import { login, logout, initUser } from "./reducers/userReducer"

import { connect } from "react-redux"
import { notify } from "./reducers/notificationReducer"



class App extends React.Component {
    

    componentDidMount = async () => {
        
        this.props.initBlogs()
        const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser")
        
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            this.props.initUser(user)
            blogService.setToken(user.token)
        }
    }
    

    render() {
        console.log(this.props.blogs)
        return (
            <div>
                
                {this.props.user.user === null ?
                    <div>
                    <Notification/>
                    <LoginForm /> 
                        </div>:
                    <div className="visibleWhenLogged">
                        <p>Logged in as {this.props.user.username} </p>
                        <button onClick={this.props.logout}>
                            Logout
                        </button>
                        <Notification/>
                        <br />
                        <br />
                        <Togglable buttonLabel={"New Blog"} ref={component => this.blogForm = component}>
                            <h2> Create a new Blog </h2>
                            <BlogForm />
                        </Togglable>
                        <BlogList/>

                        
                        
                    </div>
                }

            </div>
        )
    }
}

const mapStateToProps = (state) => {

    return {
        notification : state.notification,
        user : state.user,
        blogs: state.blogs
    }
}

export default connect(
    mapStateToProps,
    { notify, initBlogs, login, logout, initUser }
)(App)