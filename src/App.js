import React from "react"
import Blog from "./components/Blog"
import blogService from "./services/blogs"
import loginService from "./services/login"
import BlogForm from "./components/BlogForm"
import Notification from "./components/Notification"
import LoginForm from "./components/LoginForm"
import Togglable from "./components/Togglable"
import { connect } from "react-redux"
import { notify } from "./reducers/notificationReducer"



class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            blogs: [],
            notification: null,
            username: '',
            password: '',
            user: null,

        }
    }

    componentDidMount = async() => {
        //changed it to async, and added sorting if I get it to work when not reloading.
        const blogs = await blogService.getAll()
        
        const sortedBlogs = this.sortBlogs(blogs)
        this.setState({blogs:sortedBlogs})
        
        const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser")
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            this.setState({ user })
            blogService.setToken(user.token)
        }
    }
    handleLoginFieldChange = (event) => {

        this.setState({ [event.target.name]: event.target.value })

    }
    addBlog = (blog) => {
        console.log("adding", blog.title)
        
        this.blogForm.toggleVisibility()
        
        const addedSortedBlogs = this.sortBlogs(this.state.blogs.concat(blog))
        this.setState({ blogs: addedSortedBlogs,})

        this.props.notify(`a new blog "${blog.title}" by ${blog.author} added.`, false,5)

    }
    updateBlog = (updatedBlog) => {
        //updates only App state
        const currentBlogs = this.state.blogs
        currentBlogs.forEach(blog => {
            if (blog._id === updatedBlog._id) {
                blog = updatedBlog
            }
        })
        const updatedSortedBlogs = this.sortBlogs(currentBlogs)
        this.setState({ blogs: updatedSortedBlogs })


    }
    deleteBlog= (toDelete) => {
        //need to update back end so that when blog is removed blog id is removed from user.
        const currentBlogs = this.state.blogs
        
        let indexToDelete = null
        for(let i=0;i<currentBlogs.length;i++){
            if(currentBlogs[i].id === toDelete.id){
                indexToDelete = i
                console.log(indexToDelete)
            }
        }
        if(indexToDelete !== null){
            console.log("deleting", currentBlogs[indexToDelete].title)
            currentBlogs.splice(indexToDelete,1)
        }
        this.setState({blogs:currentBlogs})
        this.props.notify(` "${toDelete.title}" by ${toDelete.author} deleted.`, false, 5)
        
        
    }
    sortBlogs = (blogs) => {
        //only works at reloads, dunno how to get it to do it dynamicly
        //would work similarly with each render, but thats too many unneccesary sorts.
        //currently updateBlog and AddBlog calls this before calling setState on this.state.blogs
        
        const sortedBlogs = blogs.concat()
            .sort((a, b) => a.likes < b.likes)
        return sortedBlogs




    }


    login = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username: this.state.username,
                password: this.state.password
            })
            window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
            blogService.setToken(user.token)
            this.setState({ username: '', password: '', user })
            this.props.notify("Success",false,1)
            console.log("user set to", user)
        } catch (exception) {
            this.props.notify("Käyttäjätunnus tai salasana virheellinen.", true, 5)

        }
    }

    logout = async (event) => {
        event.preventDefault()
        try {
            this.setState({
                user: null
            })
            console.log("user set to null")
            window.localStorage.removeItem("loggedBlogAppUser")
        } catch (exception) {
            
            this.props.notify("unknown logout error", true, 5)
        }
    }


    render() {
        
        return (
            <div>
                
                {this.state.user === null ?
                    <div>
                    <Notification/>
                    <LoginForm
                        username={this.state.username}
                        password={this.state.password}
                        handleChange={this.handleLoginFieldChange}
                        handleSubmit={this.login} /> 
                        </div>:
                    <div className="visibleWhenLogged">
                        <p>Logged in as {this.state.user.username} </p>
                        <button onClick={this.logout}>
                            Logout
                        </button>
                        <Notification/>
                        <br />
                        <br />
                        <Togglable buttonLabel={"New Blog"} ref={component => this.blogForm = component}>
                            <h2> Create a new Blog </h2>
                            <BlogForm addBlog={this.addBlog} > </BlogForm>
                        </Togglable>

                        <h2>Blogs</h2>
                        <div className="blogListWrapper">
                            {this.state.blogs.map(blog =>
                                <Blog key={blog.id} blog={blog} updateBlog={this.updateBlog} deleteBlog={this.deleteBlog}/>
                            )}
                        </div>
                        
                    </div>
                }

            </div>
        )
    }
}

export default connect(
    null,
    { notify }
)(App)