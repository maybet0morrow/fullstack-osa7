import React from "react"

import { logout } from "../reducers/loginReducer"
import { connect } from "react-redux"
import { Button } from "../../node_modules/semantic-ui-react"
import { generalButton } from "../styles"

class LoginInfo extends React.Component {

    render() {
        return (
            <div>
                <span>
                Logged in as {this.props.loggedUser.username}&nbsp;
                </span>
                <Button onClick={this.props.logout} style={generalButton} size="mini">
                    Logout
                </Button>
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