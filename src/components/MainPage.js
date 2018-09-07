import React from "react"


import BlogForm from "./BlogForm"
import { connect } from "react-redux"
import BlogList from "./BlogList"
import Togglable from "./Togglable"
import SelectedBlog from "./SelectedBlog"
import { BrowserRouter as Router, Route } from "react-router-dom"


// Should both this and <Selected blog> user redux or should i just pass blogs from here to it???
const MainPage = (props) => {
    console.log(props)
    return (
        <Router>
            <div>
                <br />
                <br />
                <Togglable buttonLabel={"New Blog"} ref={component => this.blogForm = component}>
                    <h2> Create a new Blog </h2>
                    <BlogForm />
                </Togglable>
                <br/>
                {props.blogs.length === 0 ? <div /> :
                    <Route exact path="/blogs/:id" render={({ match }) =>
                        <div>

                            <SelectedBlog match={match} />

                        </div>
                    } />
                }
                <br/>
                <BlogList />
            </div>
        </Router>
    )
}
const mapStateToProps = (state) => {
    return {
        blogs: state.blogs
    }
}

export default connect(
    mapStateToProps
)(MainPage)



