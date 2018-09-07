import React from "react"

import { logout } from "../reducers/loginReducer"
import { connect } from "react-redux"

class LoginInfo extends React.Component {

    render() {
        return (
            <div className="visibleWhenLogged">
                <div>Logged in as {this.props.loggedUser.username} </div>
                <button onClick={this.props.logout}>
                    Logout
                </button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {

    return {
        loggedUser: state.user,
    }
}

export default connect(
    mapStateToProps,
    { logout }
)(LoginInfo)