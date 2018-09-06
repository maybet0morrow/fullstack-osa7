import React from "react"

import {notify} from "../reducers/notificationReducer"
import { createBlog } from "../reducers/blogReducer"
import { connect } from "react-redux";


class BlogForm extends React.Component {
    
// doesn't automaticly shutdown.

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
                <form onSubmit={this.handleSubmit}>
                    <div>
                        title:
                    <input
                            type="text"
                            name="title"
                            
                        />
                    </div>
                    <div>
                        author:
                    <input
                            type="text"
                            name="author"
                            
                        />
                    </div>
                    <div>
                        url:
                    <input
                            type="url"
                            name="url"
                            
                        />
                    </div>
                    <button type="submit">create</button>
                </form>
            </div>
        )
    }
}



export default connect(
    null,
    {notify, createBlog}
)(BlogForm)