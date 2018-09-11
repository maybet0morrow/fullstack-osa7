import React from "react"
import { Container, Menu } from "../../node_modules/semantic-ui-react"
import LoginInfo from "./LoginInfo"

class NavMenu extends React.Component {
    state = { activeItem: null }

    handleItemClick = (e, { name }) => {
        this.setState({ activeItem: name })

        switch (name) {
        case "home": {
            this.props.history.push("/")
            break
        }
        case "blogs": {
            this.props.history.push("/blogs/")
            break
        }
        case "users": {
            this.props.history.push("/users/")
            break
        }
        default:
            break

        }
    }


    render() {
        return (
            <Container>
                <Menu pointing secondary inverted>
                    <Menu.Item
                        name="home"
                        active={this.state.activeItem === "home"}
                        onClick={this.handleItemClick}
                    />
                    <Menu.Item
                        name="blogs"
                        active={this.state.activeItem === "blogs"}
                        onClick={this.handleItemClick}
                    />
                    <Menu.Item
                        name="users"
                        active={this.state.activeItem === "users"}
                        onClick={this.handleItemClick}
                    />
                    <Menu.Menu position="right">
                        <Menu.Item> <LoginInfo /> </Menu.Item>
                    </Menu.Menu>


                </Menu>
            </Container>
        )
    }
}

export default NavMenu