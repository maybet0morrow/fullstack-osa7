import React from "react"
import { connect } from "react-redux"
import { likeBlog, deleteBlog } from "../reducers/blogReducer"
import { notify } from "../reducers/notificationReducer"
import { Link } from "react-router-dom"

//NOT USED

class Blog extends React.Component {
    constructor(props) {
        super(props)
    }





    render() {

        const blogStyle = {
            paddingTop: 10,
            paddingLeft: 2,
            border: "solid",
            borderWidth: 1,
            marginBottom: 5
        }
        return (
            <div style={blogStyle}>
                <div  className="simple" onClick={this.toggleVisibility}>
                    <Link to={`/blogs/${this.props.blog.id}`}> {this.props.blog.title}, <b> {this.props.blog.author}</b> </Link>
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
