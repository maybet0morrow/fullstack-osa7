import React from "react"
import { likeBlog, deleteBlog } from "../reducers/blogReducer"
import { connect } from "react-redux"
import { notify } from "../reducers/notificationReducer"

class SelectedBlog extends React.Component {


    likeClick = (blog) => (event) => {
        event.preventDefault()
        this.props.likeBlog(blog)
        this.props.notify(`Liked: ${blog.title}`, false, 5)
    }

    deleteClick = (blog) => (event) => {
        event.preventDefault()
        // props.user doesn't have id so we are determining same user via username, which is viable since backend checks for dublicates.
        if((blog.user === null)||(this.props.user.username === blog.user.username)){
            this.props.deleteBlog(blog)
            this.props.notify(`${blog.title} deleted.`,false,5)
            this.props.history.push("/blogs")
        }else{
            this.props.notify("You cannot delete blogs created by other users.",true,5)
        }

    }

    render() {
        const blog = this.props.blogs.find(a => a.id === this.props.match.params.id)

        return (
            <div>
                <h2> {blog.title}, by  {blog.author} </h2>
                <a href={blog.url}>{blog.url}</a>
                <br/>
                {blog.likes} likes
                <button onClick={this.likeClick(blog)}> Like </button>
                <div>Added by {blog.user === null ? "Anonymous" : blog.user.name} </div>
                <button onClick={this.deleteClick(blog)} > Delete </button>
            </div>
        )
    }

}


const mapStateToProps = (state) => {
    return {
        blogs: state.blogs,
        user : state.user,
    }
}

export default connect(
    mapStateToProps,
    { likeBlog, notify, deleteBlog }
)(SelectedBlog)
