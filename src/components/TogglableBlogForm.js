import React from "react"
import { Form, Button } from "semantic-ui-react"
import { notify } from "../reducers/notificationReducer"
import { createBlog } from "../reducers/blogReducer"
import { connect } from "react-redux"
import { generalButton } from "../styles"


class TogglableBlogForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false
        }
    }

    toggleVisibility = () => {
        this.setState({ visible: !this.state.visible })
    }

    handleSubmit = async (event) => {

        event.preventDefault()
        if(this.state.visible === false){
            event.target.title.value = ""
            event.target.author.value = ""
            event.target.url.value =""
            return
        }
        console.log("creating...")
        const title = event.target.title.value
        const author = event.target.author.value
        const url = event.target.url.value

        event.target.title.value = ""
        event.target.author.value = ""
        event.target.url.value =""

        if((title === "")||(author === "")||(url === "")){
            this.props.notify("Missing content",true,5)
            return
        }

        const blogObject = {
            title,
            author,
            url,
            likes: 0,
        }
        this.props.createBlog(blogObject)
        this.toggleVisibility()

    }




    render() {
        const hideWhenVisible = { display: this.state.visible ? "none" : "" }
        const showWhenVisible = { display: this.state.visible ? "" : "none" }
        return (
            <div>
                <div style={hideWhenVisible}>
                    <Button onClick={this.toggleVisibility} style={generalButton}> New Blog </Button>
                </div>
                <div style={showWhenVisible}>
                    <h2> Create a new Blog </h2>
                    <Form onSubmit={this.handleSubmit} >
                        <Form.Field >
                            <input name="title" placeholder="Title of the blog" />
                        </Form.Field>
                        <Form.Field>
                            <input name="author" placeholder="Authors name" />
                        </Form.Field>
                        <Form.Field>
                            <input name="url" placeholder="Link to the blog" />
                        </Form.Field>

                        <Button type="submit" style={generalButton}>Create</Button>
                        <Button type="cancel" onClick={this.toggleVisibility} style={generalButton}>Cancel</Button>

                    </Form>
                </div>
            </div>
        )
    }
}



export default connect(
    null,
    { notify, createBlog }
)(TogglableBlogForm)