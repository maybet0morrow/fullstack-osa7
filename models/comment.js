const mongoose = require("mongoose")


const commentSchema = new mongoose.Schema({
    content: String,
    date: Date,
    blog: { type: mongoose.Schema.Types.ObjectId, ref: "Blog" }
})

commentSchema.statics.format = (comment) => {
    return {
        id: comment._id,
        content: comment.content,
        date: comment.date,
        blog: comment.blog

    }
}

const Comment = mongoose.model("Comment", commentSchema)

module.exports = Comment