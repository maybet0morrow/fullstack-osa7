import React from "react"
import { likeBlog } from "../reducers/blogReducer"
import { connect } from "react-redux"
import { notify } from "../reducers/notificationReducer"

class SelectedBlog extends React.Component {
    constructor(props) {
        super(props)
    }


    likeClick = (event) => (blog) => {
        event.preventDefault()
        this.props.likeBlog(blog)
        this.props.notify(`Liked: ${blog.title}`, false, 5)
    }
    render() {
        const blog = this.props.blogs.find(a => a.id === this.props.match.params.id)
        console.log(this.props)
        return (
            <div>
                <h2> {blog.title}, by  {blog.author} </h2>
                <a href={blog.url}>{blog.url}</a>
                <br/>
                {blog.likes} likes
                <button onClick={this.likeClick(blog)}> Like </button>
                <div>Added by {blog.user === undefined ? "Anonymous" : blog.user.name} </div>
            </div>
        )
    }

}


const mapStateToProps = (state) => {
    return {
        blogs: state.blogs
    }
}

export default connect(
    mapStateToProps,
    { likeBlog, notify }
)(SelectedBlog)
