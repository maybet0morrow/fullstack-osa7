import React from "react"

import { likeBlog, deleteBlog } from "../reducers/blogReducer"
import { Table } from "semantic-ui-react"
import { notify } from "../reducers/notificationReducer"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
// could add header sort by functionality, maybe later
// changed list to table with headers.
const BlogList = (props) => {

    return (
        <div>
            <h2>Blogs</h2>
            <div className="blogListWrapper">
                <Table striped celled >
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell> Title </Table.HeaderCell>
                            <Table.HeaderCell> Author </Table.HeaderCell>
                            <Table.HeaderCell> Likes </Table.HeaderCell>
                        </Table.Row>

                    </Table.Header>
                    <Table.Body>
                        {props.sortedBlogs.map(blog =>
                            <Table.Row key={blog.id}>
                                <Table.Cell>
                                    <Link to={`/blogs/${blog.id}`}> {blog.title} </Link>
                                </Table.Cell>
                                <Table.Cell> {blog.author} </Table.Cell>
                                <Table.Cell> {blog.likes} </Table.Cell>
                            </Table.Row>
                        )}
                    </Table.Body>
                </Table>

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