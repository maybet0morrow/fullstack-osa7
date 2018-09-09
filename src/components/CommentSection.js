import React from "react"
import { List, Form, Button } from "semantic-ui-react"
import { connect } from "react-redux"


import { createComment } from "../reducers/commentReducer"

class CommentSection extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            comments: this.props.blogs.find(a => a.id === this.props.match.params.id).comments
        }
    }
    genTempId = () => {
        return String(Math.round(Math.random() * 1000000000))
    }
    handleSubmit = async (e) => {
        console.log("adding comment")
        e.preventDefault()

        const blogID = this.props.blogs.find(a => a.id === this.props.match.params.id).id
        const comment = { content: e.target.content.value, _id: this.genTempId  }
        this.props.createComment(comment, blogID)
        this.setState({ comments: [...this.state.comments, comment] })
        e.target.content.value = ""



    }

    render() {

        console.log(this.state.comments)
        return (
            <div>
                <h3> Comments </h3>
                {(this.state.comments === undefined) ?
                    <div/>
                    :
                    <div>
                        <List bulleted>
                            {this.state.comments.map(comment =>
                                <List.Item key={comment._id}> {comment.content} </List.Item>
                            )}
                        </List>
                        <br/>

                    </div>
                }
                <Form onSubmit={this.handleSubmit}>
                    <Form.Field>
                        <label> Comment </label>
                        <input name="content" placeholder="Write Your Comment Here." />
                    </Form.Field>
                    <Button type="submit">Submit</Button>
                </Form>

            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        blogs: state.blogs,
    }
}

export default connect(
    mapStateToProps,
    { createComment }
)(CommentSection)