import React from "react"

import UserList from "./UserList"

import SelectedUser from "./SelectedUser"
import { BrowserRouter as Router, Route } from "react-router-dom"
import { connect } from "react-redux"
import TogglableBlogForm from "./TogglableBlogForm"


const UserPage = (props) => {
    //Mikä ton create napin pitäs olla? create blog? Create user? Pitäisikö sellainen toiminnallisuus olla? Ja että sitä voi käyttää pitää olla toisella userilla sisällä???

    //Router ja users/:id conditional route siirretty tänne --> pysyy App siistimpänä, toimii vieläki refressillä koska conditional.

    return (
        <Router >
            <div>
                <br />
                <br />
                <TogglableBlogForm />
                <br />
                {props.users.length === 0 ? <div /> :
                    <Route exact path="/users/:id" render={({ match }) =>
                        <div>

                            <SelectedUser match={match} />

                        </div>
                    } />
                }
                <br />
                <UserList />
            </div>
        </Router>
    )
}

const mapStateToProps = (state) => {
    return {
        users: state.users
    }
}

export default connect(
    mapStateToProps,

)(UserPage)

