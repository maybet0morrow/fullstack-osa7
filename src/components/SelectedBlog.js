import React from "react"
import { likeBlog, deleteBlog } from "../reducers/blogReducer"
import { connect } from "react-redux"
import { notify } from "../reducers/notificationReducer"
import { Button, Segment, Label, Icon, Header } from "semantic-ui-react"
import { headerSegmentStyle, likeButton, hideButton, headerStyle, generalButton } from "../styles"

class SelectedBlog extends React.Component {


    likeClick = (blog) => (event) => {
        event.preventDefault()
        this.props.likeBlog(blog)
        this.props.notify(`Liked: ${blog.title}`, false, 5)
    }

    deleteClick = (blog) => (event) => {
        event.preventDefault()
        // props.user doesn't have id so we are determining same user via username, which is viable since backend doesn't allow dublicate usernames.
        if ((blog.user === null) || (blog.user === undefined) || (this.props.user.username === blog.user.username)) {
            this.props.deleteBlog(blog)
            this.props.notify(`${blog.title} deleted.`, false, 5)
            this.props.history.push("/blogs/")
        } else {
            this.props.notify("You cannot delete blogs created by other users.", true, 5)
        }

    }
    hideSelected = (event) => {
        event.preventDefault()
        this.props.history.push("/blogs/")
    }

    render() {
        const blog = this.props.blogs.find(a => a.id === this.props.match.params.id)



        return (
            <div>
                <Segment inverted style={headerSegmentStyle}>
                    <Button animated="fade" size="small" color="grey" onClick={this.hideSelected} style={hideButton} >
                        <Button.Content visible>
                            <Icon name="close" />
                        </Button.Content>
                        <Button.Content hidden> Hide </Button.Content>
                    </Button>
                    <Header as="h2" inverted style={headerStyle}> {blog.title}, by {blog.author}</Header>

                </Segment>

                <Segment inverted >
                    <Label  color="black"  >
                        <Icon name="info" size="large" circular inverted/>
                        <a href={blog.url}><font size="3"> {blog.url}</font></a>
                    </Label>
                </Segment>

                <Segment inverted>
                    <Label  color="black" >
                        <Icon name="chart bar" size="large" circular inverted/>

                        <font size="3">{blog.likes} likes</font>

                    </Label>
                    <Button animated="fade" size="small" color="grey" onClick={this.likeClick(blog)} style={likeButton} >
                        <Button.Content visible>
                            <Icon name="thumbs up" />
                        </Button.Content>
                        <Button.Content hidden> Like </Button.Content>
                    </Button>
                </Segment>



                <Segment inverted>
                    <Label color="black">
                        <Icon name="heart" size="large" circular inverted />
                        <font size="3"> Added by {blog.user === undefined ? "Anonymous" : blog.user.name} </font>
                    </Label>
                </Segment>


                <Button onClick={this.deleteClick(blog)} style={generalButton}> Delete </Button>

            </div>
        )
    }

}


const mapStateToProps = (state) => {
    return {
        blogs: state.blogs,
        user: state.user,
    }
}

export default connect(
    mapStateToProps,
    { likeBlog, notify, deleteBlog }
)(SelectedBlog)
