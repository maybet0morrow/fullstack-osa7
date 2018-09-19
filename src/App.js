//@flow
// Problems with flow, after following the installing guide provided and running npm run flow, got errors for module imports e.g. import React from "react", couldn't resolve
// steps taken -> unignore node_modules in flow config, still Cannot resolve module `../node_modules/semantic-ui-react`.
// also error about class App extends React.Component
// added flow to userReducer and blogService and loginService.
import React from "react"

import blogService from "./services/blogs"
import commentService from "./services/comments"
import BlogPage from "./components/BlogPage"
import Notification from "./components/Notification"
import LoginForm from "./components/LoginForm"
import UserPage from "./components/UserPage"

import { initBlogs } from "./reducers/blogReducer"
import { login, logout, initLoggedUser } from "./reducers/loginReducer"
import { initComments } from "./reducers/commentReducer"

import { initUsers } from "./reducers/userReducer"

import { connect } from "react-redux"
import { notify } from "./reducers/notificationReducer"

import { BrowserRouter as Router, Route } from "react-router-dom"
import { Container } from "../node_modules/semantic-ui-react"

import { generalStyle } from "./styles"
import NavMenu from "./components/NavMenu"

/*
Ongelmia:


- blogs/id --> blogs näyttää vieläkin selected blogin

-Delete blog ei päivity
- Kirjautuessa notification state ei päivity --> notification ei renderaa, varmaan koska, loginForm --> loginReducer --> NotificationReducer --> Notification


FIXED:
-post comment ei päivity FIXED!!!
- blog form doesn't hide after adding
- comments not updating after submit



TODO:
-database cleaning , either while deleting blog, delete references from user and comments that refer to that blog or prune database at backend startup. example: when you delete a blog, reference to that blog remains in user, and comments with that blogs id remain.
*/
// gonna remove the expandable list stuff from blog list and just add delete button on selectedBlog



class App extends React.Component {


    componentDidMount = async () => {
        this.props.initUsers()
        this.props.initBlogs()
        this.props.initComments()
        const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser")

        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            this.props.initLoggedUser(user)
            blogService.setToken(user.token)
            commentService.setToken(user.token)
        }
    }


    render() {
        console.log(this.props)
        return (
            <Container className="appContainer" style={generalStyle}>
                <Router>

                    <div>
                        <Notification />
                        {this.props.loggedUser === null ?
                            <div>
                                <LoginForm />
                            </div> :
                            <div>
                                <Route path="/" render={({ history }) =>
                                    <NavMenu history={history} />
                                } />
                                <br/>

                                <Route path="/users/" render={() => <UserPage />} />

                                <Route path="/blogs/" render={() => <BlogPage />} />






                            </div>
                        }
                    </div>

                </Router>


            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.users,
        notification: state.notification,
        loggedUser: state.user,
        blogs: state.blogs,
        comments: state.comments

    }
}

export default connect(
    mapStateToProps,
    { notify, initBlogs, login, logout, initLoggedUser, initUsers, initComments }
)(App)