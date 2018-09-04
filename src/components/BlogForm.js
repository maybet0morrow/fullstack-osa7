import React from "react"
import blogService from "../services/blogs"
import PropTypes from 'prop-types'


class BlogForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            author: "",
            title: "",
            likes: 0,
            url: "",
            user: null
            
        }
    }

    handleBlogFormFieldChange = (event) => {

        this.setState({ [event.target.name]: event.target.value })

    }

    createBlog = async (event) => {
        console.log("creating...")
        event.preventDefault()
        
        try {
            const blogObject = {
                title: this.state.title,
                author: this.state.author,
                url: this.state.url,
                likes: this.state.likes,
                
            }
            const addedBlog = await blogService.create(blogObject)
            
            this.setState({
                author: "",
                title: "",
                url: "",
                
            })
            
            console.log(this.props)
            this.props.addBlog(addedBlog)
            
            
            
        } catch (exception) {
            console.log(exception)
        }
    }

    

    
    render() {
        return (
            <div>
                <form onSubmit={this.createBlog}>
                    <div>
                        title:
                    <input
                            type="text"
                            name="title"
                            value={this.state.title}
                            onChange={this.handleBlogFormFieldChange}
                        />
                    </div>
                    <div>
                        author:
                    <input
                            type="text"
                            name="author"
                            value={this.state.author}
                            onChange={this.handleBlogFormFieldChange}
                        />
                    </div>
                    <div>
                        url:
                    <input
                            type="url"
                            name="url"
                            value={this.state.url}
                            onChange={this.handleBlogFormFieldChange}
                        />
                    </div>
                    <button type="submit">create</button>
                </form>
            </div>
        )
    }
}
BlogForm.propTypes = {
    addBlog: PropTypes.func.isRequired,
    
}
export default BlogForm