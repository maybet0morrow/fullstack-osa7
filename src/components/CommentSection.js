import React from "react"
import { List, Form, Button, Label } from "semantic-ui-react"
import { connect } from "react-redux"
import { generalButton } from "../styles"


import { createComment } from "../reducers/commentReducer"

class CommentSection extends React.Component {


    genTempId = () => {
        return String(Math.round(Math.random() * 1000000000))
    }
    handleSubmit = async (e) => {
        console.log("adding comment")
        e.preventDefault()

        const blogID = this.props.blogs.find(a => a.id === this.props.match.params.id).id
        const comment = { content: e.target.content.value, _id: this.genTempId }
        this.props.createComment(comment, blogID)
        e.target.content.value = ""





    }

    render() {

        const comments = this.props.comments.filter(comment => comment.blog._id === this.props.match.params.id)
        return (
            <div>
                <h3> Comments({comments.length}) </h3>
                {(comments === undefined) ?
                    <div />
                    :
                    <div>
                        <List inverted>
                            {comments.map(comment =>
                                <List.Item key={comment.id}>
                                    <Label color="black" size="large">
                                        {comment.content}
                                    </Label>
                                </List.Item>
                            )}
                        </List>
                        <br />

                    </div>
                }
                <Form onSubmit={this.handleSubmit}>
                    <Form.Field>

                        <input name="content" placeholder="Write Your Comment Here." />
                    </Form.Field>
                    <Button type="submit" style={generalButton}>Submit</Button>
                </Form>

            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        blogs: state.blogs,
        comments: state.comments
    }
}

export default connect(
    mapStateToProps,
    { createComment }
)(CommentSection)