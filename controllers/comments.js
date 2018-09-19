const commentsRouter = require("express").Router()
const Comment = require("../models/comment")
const Blog = require("../models/blog")
const jwt = require("jsonwebtoken")

commentsRouter.get("/all_comments", async (request, response) => {
    const comments = await Comment
        .find({})
        .populate("blog", { title: 1, author: 1 })
    response.json(comments.map(Comment.format))
})


commentsRouter.post("/:id/comments/", async (request, response) => {
    try {
        const decodedToken = jwt.verify(request.token, process.env.SECRET)

        if (!request.token || !decodedToken.id) {
            return response.status(401).json({ error: "token missing or invalid" })
        }
        const body = request.body
        if ((body.content === undefined) || (body.content.length === 0)) {
            return response.status(400).json({ error: "Missing or zero length comment" })
        }

        const blog = await Blog.findById(request.params.id)


        console.log(blog)
        const comment = new Comment({
            content: body.content,
            date: Date.now(),
            blog: blog

        })


        const savedComment = await comment.save()
        if(blog.comments === undefined) {
            blog.comments = [savedComment._id]
        }else{
            blog.comments = blog.comments.concat(savedComment._id)
        }

        await blog.save()
        response.json(Comment.format(comment))


    } catch (exception) {
        if (exception.name === "JsonWebTokenError") {
            response.status(401).json({ error: exception.message })
        } else {
            console.log(exception)
            response.status(500).json({ error: "something went wrong..." })
        }

    }
})

module.exports = commentsRouter