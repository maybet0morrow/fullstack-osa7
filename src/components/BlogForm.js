import React from "react"

import {notify} from "../reducers/notificationReducer"
import { createBlog } from "../reducers/blogReducer"
import { connect } from "react-redux";


class BlogForm extends React.Component {
    // LISÄTESSÄ BACKEND PALAUTTAA blogin jossa user kentässä vain userID --> Et voi poistaa samalla loadilla koska tällä hetkellä toisella loadilla ei user id:tä, pitää muutta backend.
    //delete ei renderoi päivitettyä listaa.

    handleSubmit = async (event) => {
        console.log("creating...")
        event.preventDefault()
        const title = event.target.title.value
        const author = event.target.author.value
        const url = event.target.url.value
        event.target.title.value = ""
        event.target.author.value = ""
        event.target.url.value =""
        
        try {
            const blogObject = {
                title,
                author,
                url,
                likes: 0,
            }
            this.props.createBlog(blogObject)
        } catch (exception) {
            console.log(exception)
        }
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