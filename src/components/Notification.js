import React from "react"
import "./notification.css"
import PropTypes from 'prop-types'

const Notification = ({ message, error }) => {
    if (message === null) {
        return null
    }

    if (error === true) {
        return (
            <div className="error">
                {message}
            </div>
        )

    }
    return (
        <div className="notification">
            {message}
        </div>
    )
}
Notification.propTypes = {
    
    error: PropTypes.bool.isRequired,
}

export default Notification