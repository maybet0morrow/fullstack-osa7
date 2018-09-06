import React from 'react'
import { connect } from "react-redux"
import { login } from "../reducers/loginReducer"
import {notify} from "../reducers/notificationReducer"

class LoginForm extends React.Component {
    handleSubmit = async (e) => {
        e.preventDefault()
        
        const username = e.target.username.value
        const password = e.target.password.value
        this.props.login(username,password)
        
        
        

    }
    render() {
        return (
            <div>
                <h2>Kirjaudu</h2>
    
                <form onSubmit={this.handleSubmit}>
                    <div>
                        käyttäjätunnus
                        <input
                            name="username"
                        />
                    </div>
                    <div>
                        salasana
                        <input
                            type="password"
                            name="password"
                        />
                    </div>
                    <button type="submit">kirjaudu</button>
                </form>
            </div>
        )
    }
}
export default connect(
    null,
    { login, notify}
)(LoginForm)