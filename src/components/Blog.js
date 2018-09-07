import React from "react"
import { connect } from "react-redux"
import { likeBlog, deleteBlog } from "../reducers/blogReducer"
import { notify } from "../reducers/notificationReducer"

// delete ei renderoi uudelleen!!!

class Blog extends React.Component {
    constructor(props) {
        super(props)

        this.state = {

            visible: false
        }
    }
    toggleVisibility = () => {

        this.setState({ visible: !this.state.visible })

    }

    likeClick = (event) => {
        event.stopPropagation()
        this.props.likeBlog(this.props.blog)
        this.props.notify(`Liked: ${this.props.blog.title}`,false,5)

    }

    deleteClick = (event) => {
        event.preventDefault()
        // props.user doesn't have id so we are determining same user via username, which is viable since backend checks for dublicates.
        if((this.props.user.username === this.props.blog.user.username)||(this.props.blog.user === null)){
            this.props.deleteBlog(this.props.blog)
        }else{
            this.props.notify("You cannot delete blogs created by other users.",true,5)
        }

    }




    render() {

        const hideWhenVisible = { display: this.state.visible ? "none" : "" }
        const showWhenVisible = { display: this.state.visible ? "": "none" }
        const blogStyle = {
            paddingTop: 10,
            paddingLeft: 2,
            border: "solid",
            borderWidth: 1,
            marginBottom: 5
        }
        return (
            <div style={blogStyle}>
                <div style={hideWhenVisible} className="simple" onClick={this.toggleVisibility}>
                    <p > {this.props.blog.title}, <b> {this.props.blog.author}</b></p>
                </div>
                <div style={showWhenVisible} className="expanded" onClick={this.toggleVisibility}>
                    <div > {this.props.blog.title}, <b> {this.props.blog.author}</b></div>
                    {this.props.blog.url}
                    <br/>
                    {this.props.blog.likes} likes
                    <button onClick={this.likeClick}> Like </button>
                    <div>Added by {this.props.blog.user === undefined ? "Anonymous": this.props.blog.user.name} </div>
                    <button onClick={this.deleteClick} > Delete </button>
                </div>
            </div>

        )
    }
}

const mapStateToProps = (state) => {

    return {
        user : state.user,
    }
}

export default connect(
    mapStateToProps,
    { likeBlog, deleteBlog, notify }
)(Blog)
