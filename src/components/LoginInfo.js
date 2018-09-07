import React from "react"

import { logout } from "../reducers/loginReducer"
import { connect } from "react-redux"

class LoginInfo extends React.Component {

    render() {
        return (
            <div>
                Logged in as {this.props.loggedUser.username}&nbsp;

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