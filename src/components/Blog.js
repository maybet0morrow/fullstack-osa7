import React from "react"
import blogService from "../services/blogs"
import PropTypes from "prop-types"


class Blog extends React.Component {
    constructor(props) {
        super(props)
        
        this.state = {
            blog : this.props.blog,
            visible: false
        }
    }
    toggleVisibility = () => {
        this.setState({ visible: !this.state.visible })
        
    }
    updateBlog = async (event) => {
        event.preventDefault()
        
        try{
            const  blogObject ={
                title: this.state.blog.title,
                author: this.state.blog.author,
                url: this.state.blog.url,
                likes: this.state.blog.likes++,
                id: this.state.blog.id,
                user: this.state.blog.user
                
            }
            blogObject.likes +=1
            // Here is something weird, "likes" increment happens twice
            // But it doesn't double it in either frontend or backend
            // with only ++ operation the backend doesn't get the increment only frontend
            //with += 1 the back end catches up but frontend doesn't update...
            //weird but let's keep it for now and go forward..
            await blogService.update(blogObject)
            this.props.updateBlog(blogObject)
            
            
        } catch (exception) {
            console.log(exception)
            
        }
    }
    deleteBlog = async (event) => {
        event.preventDefault()
        window.confirm(`delete "${this.state.blog.title}" by ${this.state.blog.author}`)
        try{
   
            await blogService.deleteBlog(this.state.blog)
            this.props.deleteBlog(this.state.blog)
            
            
        } catch(exception){
            console.log(exception)
            //this.props.setError("You cannot delete blogs added by other users")
        }
    }
    

    

    render() {
        
        const hideWhenVisible = { display: this.state.visible ? "none" : "" }
        const showWhenVisible = { display: this.state.visible ? "": "none"}
        const blogStyle = {
            paddingTop: 10,
            paddingLeft: 2,
            border: 'solid',
            borderWidth: 1,
            marginBottom: 5
          }
        return (
            <div style={blogStyle}>
                <div style={hideWhenVisible} className="simple" onClick={this.toggleVisibility}>
                    <p > {this.state.blog.title}, <b> {this.state.blog.author}</b></p>
                </div>
                <div style={showWhenVisible} className="expanded" onClick={this.toggleVisibility}>
                    <div > {this.state.blog.title}, <b> {this.state.blog.author}</b></div>
                    {this.state.blog.url}
                    <br/>
                    {this.state.blog.likes} likes
                <button onClick={this.updateBlog} > Like </button>
                     <div>Added by {this.state.blog.user === undefined ? "Anonymous": this.state.blog.user.name} </div>
                     <button onClick={this.deleteBlog} > Delete </button>
                </div>
            </div>

        )
    }
}

Blog.propTypes = {
    
    blog: PropTypes.object.isRequired,
    updateBlog: PropTypes.func.isRequired,
    deleteBlog: PropTypes.func.isRequired,
    

}
export default Blog
