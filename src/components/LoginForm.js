import React from 'react'
import PropTypes from 'prop-types'
const LoginForm = ({ handleSubmit, handleChange, username, password }) => {
    return (
        <div>
            <h2>Kirjaudu</h2>

            <form onSubmit={handleSubmit}>
                <div>
                    käyttäjätunnus
                    <input
                        value={username}
                        onChange={handleChange}
                        name="username"
                    />
                </div>
                <div>
                    salasana
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">kirjaudu</button>
            </form>
        </div>
    )
}
LoginForm.propTypes = {
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired
}
export default LoginForm