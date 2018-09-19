import React from "react"
import { Table } from "semantic-ui-react"
import { connect } from "react-redux"



// Probably better to keep redux here still so app doesn't have extra stuff.
const SelectedUser = (props) => {
    const user = props.users.find(a => a.id === props.match.params.id)
    const blogsWithUser = props.blogs.filter(a => a.user !== undefined)
    const blogs = blogsWithUser.filter(a => a.user._id === user.id)
    return (

        <div>
            <h2>{user.name}</h2>
            <Table striped celled inverted color="black">
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Title</Table.HeaderCell>
                        <Table.HeaderCell>Author</Table.HeaderCell>
                        <Table.HeaderCell>Likes</Table.HeaderCell>

                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {blogs.sort((a,b) => (b.likes - a.likes)).map(blog =>
                        <Table.Row key={blog.id}>
                            <Table.Cell>{blog.title} </Table.Cell>
                            <Table.Cell>{blog.author} </Table.Cell>
                            <Table.Cell>{blog.likes} </Table.Cell>
                        </Table.Row>
                    )}
                </Table.Body>
            </Table>



        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        users : state.users,
        blogs : state.blogs
    }
}

export default connect(
    mapStateToProps,

)(SelectedUser)
