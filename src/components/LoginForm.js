import React from "react"
import { connect } from "react-redux"
import { login } from "../reducers/loginReducer"
import { notify } from "../reducers/notificationReducer"
import { Form, Button } from "../../node_modules/semantic-ui-react"
import { generalButton } from "../styles"

class LoginForm extends React.Component {
    handleSubmit = async (e) => {
        e.preventDefault()

        const username = e.target.username.value
        const password = e.target.password.value
        this.props.login(username,password)
        e.target.username.value = ""
        e.target.password.value = ""





    }
    render() {
        console.log("rendering LoginForm")
        return (
            <div>
                <h2>Kirjaudu</h2>

                <Form onSubmit={this.handleSubmit}>
                    <Form.Field>

                        <input
                            name="username"
                            placeholder="Username"
                        />
                    </Form.Field>

                    <Form.Field>

                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                        />
                    </Form.Field>
                    <Button type="submit" style={generalButton}>Login</Button>
                </Form>
            </div>
        )
    }
}
export default connect(
    null,
    { login, notify }
)(LoginForm)