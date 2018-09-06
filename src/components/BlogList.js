import React from "react"
import Blog from "./Blog"
import { likeBlog, deleteBlog } from "../reducers/blogReducer"
import { notify } from "../reducers/notificationReducer"
import { connect } from "react-redux";

const BlogList = (props) => {
    
    return (
        <div>
            <h2>Blogs</h2>
            <div className="blogListWrapper">
                {props.sortedBlogs.map(blog =>
                    <Blog key={blog.id} blog={blog} likeBlog={props.likeBlog} deleteBlog={props.deleteBlog} />
                )}
            </div>
        </div>
    )
}
    


const sortBlogs = (blogs) => {

    return blogs.sort((a, b) => b.likes - a.likes)
}

const mapStateToProps = (state) => {
    return {
        sortedBlogs: sortBlogs(state.blogs)
    }
}

export default connect(
    mapStateToProps,
    { likeBlog, deleteBlog, notify }
)(BlogList)