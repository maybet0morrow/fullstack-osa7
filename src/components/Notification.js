import React from "react"
import { connect } from "react-redux"


class Notification extends React.Component {

    render() {
        const styleError = {
            border: "solid",
            color: "red",
            padding: 10,
            borderWidth: 1
        }
        const styleNotification = {
            border: "solid",
            color: "green",
            padding: 10,
            borderWidth: 1
        }

        console.log(this.props.notification)
        if(this.props.notification.message === null){
            return (
                <div/>
            )
        }
        if(this.props.notification.error){
            return (
                <div style={styleError}>
                    {this.props.notification.message}
                </div>
            )
        }
        return (
            <div style={styleNotification}>
                {this.props.notification.message}
            </div>
        )
    }
}

const mapStateToProps = (state) => {

    return {
        notification : state.notification
    }
}
export default connect(
    mapStateToProps
)(Notification)