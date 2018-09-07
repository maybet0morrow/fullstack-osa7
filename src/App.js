import React from "react"

import blogService from "./services/blogs"
import MainPage from "./components/MainPage"
import Notification from "./components/Notification"
import LoginForm from "./components/LoginForm"
import SelectedUser from "./components/SelectedUser"
import UserPage from "./components/UserPage"

import { initBlogs } from "./reducers/blogReducer"
import { login, logout, initLoggedUser } from "./reducers/loginReducer"

import { initUsers } from "./reducers/userReducer"

import { connect } from "react-redux"
import { notify } from "./reducers/notificationReducer"

import { BrowserRouter as Router, Route } from "react-router-dom"
import { Container } from "../node_modules/semantic-ui-react"
import LoginInfo from "./components/LoginInfo"



class App extends React.Component {


    componentDidMount = async () => {
        this.props.initUsers()
        this.props.initBlogs()
        const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser")

        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            this.props.initLoggedUser(user)
            blogService.setToken(user.token)
        }
    }


    render() {
        // Ehkä parempikin ratkaisu olemassa /users/:id tekemiselle mutta toimii nyt.
        console.log(this.props.users.length === 0)
        return (
            <Container>
                <Router>

                    <div>
                        {this.props.loggedUser === null ?
                            <div>
                                <Notification />
                                <LoginForm />
                            </div> :
                            <div>
                                <LoginInfo />
                                <Notification />
                                <Route exact path="/" render={() => <MainPage />} />
                                {this.props.users.length === 0 ? <div /> :
                                    <Route exact path="/users/:id" render={({ match }) =>
                                        <div>

                                            <SelectedUser match={match} />

                                        </div>
                                    } />
                                }

                                <Route path="/users" render={() => <UserPage />} />

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

    }
}

export default connect(
    mapStateToProps,
    { notify, initBlogs, login, logout, initLoggedUser, initUsers }
)(App)