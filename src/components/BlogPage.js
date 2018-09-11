import React from "react"


import TogglableBlogForm from "./TogglableBlogForm"
import { connect } from "react-redux"
import BlogList from "./BlogList"
import SelectedBlog from "./SelectedBlog"
import { BrowserRouter as Router, Route } from "react-router-dom"
import CommentSection from "./CommentSection"

class BlogPage extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <br />
                    <br />
                    <TogglableBlogForm />
                    <br />
                    {this.props.blogs.length === 0 ? <div /> :
                        <Route exact path="/blogs/:id" render={({ match, history }) =>

                            <div>
                                <SelectedBlog match={match} history={history} />
                                <br />
                                <CommentSection match={match} />

                            </div>
                        } />
                    }
                    <br />
                    <BlogList />
                </div>
            </Router>
        )
    }

}
const mapStateToProps = (state) => {
    return {
        blogs: state.blogs
    }
}

export default connect(
    mapStateToProps
)(BlogPage)



