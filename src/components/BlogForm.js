import React from "react"
import { Form, Button } from "semantic-ui-react"
import { notify } from "../reducers/notificationReducer"
import { createBlog } from "../reducers/blogReducer"
import { connect } from "react-redux"


class BlogForm extends React.Component {



    handleSubmit = async (event) => {
        console.log("creating...")
        event.preventDefault()
        const title = event.target.title.value
        const author = event.target.author.value
        const url = event.target.url.value
        event.target.title.value = ""
        event.target.author.value = ""
        event.target.url.value =""


        const blogObject = {
            title,
            author,
            url,
            likes: 0,
        }
        this.props.createBlog(blogObject)

    }




    render() {
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Field>
                        <input name="title" placeholder="Title of the blog" />
                    </Form.Field>
                    <Form.Field>
                        <input name="author" placeholder="Authors name" />
                    </Form.Field>
                    <Form.Field>
                        <input name="url" placeholder="Link to the blog" />
                    </Form.Field>

                    <Button type="submit">create</Button>
                </Form>
            </div>
        )
    }
}



export default connect(
    null,
    { notify, createBlog }
)(BlogForm)