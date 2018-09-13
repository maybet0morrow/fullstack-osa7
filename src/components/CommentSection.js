import React from "react"
import { Form, Button,  Comment, Header, Divider } from "semantic-ui-react"
import { connect } from "react-redux"
import { generalButton, generalStyle } from "../styles"


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
    //not gonna format the date on comments.
    render() {

        const comments = this.props.comments.filter(comment => comment.blog._id === this.props.match.params.id)
        return (
            <div>
                <Comment.Group style={generalStyle}>
                    <Header as="h3" inverted>
                        Comments({comments.length})
                    </Header>
                    <Divider />
                    {(comments === undefined) ?
                        <div />
                        :
                        <div>

                            {comments.map(comment =>
                                <Comment key={comment.id} >
                                    <Comment.Content>
                                        <Comment.Metadata style={generalStyle}>
                                          @ {comment.date}
                                        </Comment.Metadata>
                                        <Comment.Text style={generalStyle}>
                                            {comment.content}
                                        </Comment.Text>


                                    </Comment.Content>
                                </Comment>

                            )}

                            <br />

                        </div>
                    }
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Field>

                            <input name="content" placeholder="Write Your Comment Here." />
                        </Form.Field>
                        <Button type="submit" style={generalButton}>Submit</Button>
                    </Form>

                </Comment.Group>

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