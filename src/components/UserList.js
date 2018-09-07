import React from "react"
import { Table } from "semantic-ui-react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import { notify } from "../reducers/notificationReducer"

const UserList = (props) => {

    return (
        <div>
            <h2>Blogs</h2>
            <Table striped celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Username</Table.HeaderCell>
                        <Table.HeaderCell>Blogs added</Table.HeaderCell>

                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {props.sortedUsers.map(user =>
                        <Table.Row key={user.id}>
                            <Table.Cell>
                                {/* Whole row as a link, maybe later */}
                                <Link to={`/users/${user.id}`}> {user.name} </Link>
                            </Table.Cell>
                            <Table.Cell>{user.username}</Table.Cell>
                            <Table.Cell>{user.blogs.length}</Table.Cell>
                        </Table.Row>
                    )}
                </Table.Body>
            </Table>



        </div>
    )
}



const sortUsers = (users) => {

    return users.sort((a, b) => b.blogs.length - a.blogs.length)
}

const mapStateToProps = (state) => {
    return {
        sortedUsers: sortUsers(state.users)
    }
}

export default connect(
    mapStateToProps,
    { notify }
)(UserList)