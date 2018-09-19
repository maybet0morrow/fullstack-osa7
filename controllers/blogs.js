const blogsRouter = require("express").Router()
const Blog = require("../models/blog")
const User = require("../models/user")
const jwt = require("jsonwebtoken")



blogsRouter.get("/", async (request, response) => {
    const blogs = await Blog
        .find({})
        .populate("user", { username: 1, name: 1 })
        .populate("comments", { content:1, date: 1 })
    response.json(blogs.map(Blog.format))
})



blogsRouter.post("/", async (request, response) => {
    try {

        const decodedToken = jwt.verify(request.token, process.env.SECRET)

        if (!request.token || !decodedToken.id) {
            return response.status(401).json({ error: "token missing or invalid" })
        }

        const body = request.body
        if ((body.author === undefined)
            || (body.title === undefined)
            || (body.url === undefined)) {
            return response.status(400).json({ error: "content missing" })
        }

        const user = await User.findById(decodedToken.id)


        console.log(user)
        const blog = new Blog({
            author: body.author,
            title: body.title,
            url: body.url,
            likes: (body.likes === undefined) ? 0 : body.likes,
            user: user
        })


        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()
        response.json(Blog.format(blog))




    } catch (exception) {
        if (exception.name === "JsonWebTokenError") {
            response.status(401).json({ error: exception.message })
        } else {
            console.log(exception)
            response.status(500).json({ error: "something went wrong..." })
        }

    }

})

blogsRouter.delete("/:id", async (request, response) => {
    try {
        const blog = await Blog.findById(request.params.id)
        if (blog.user === undefined) {
            await Blog.findByIdAndRemove(request.params.id)
            response.status(204).end()
        }
        else {
            const decodedToken = jwt.verify(request.token, process.env.SECRET)

            if (!request.token || !decodedToken.id) {
                return response.status(401).json({ error: "token missing or invalid" })
            }

            const userId = blog.user.toString()

            const tokenUserId = decodedToken.id
            console.log("tokenUser", tokenUserId)
            console.log("userId", userId)
            if (tokenUserId === userId) {
                await Blog.findByIdAndRemove(request.params.id)
                response.status(204).end()
            } else {
                response.status(401).json({ error: "This user doesn't have authorization to delete the blog in question." })
            }
        }




    } catch (exception) {
        response.status(400).send({ error: "malformatted id" })
    }
})

blogsRouter.put("/:id", async (request, response) => {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!request.token || !decodedToken.id) {
        return response.status(401).json({ error: "token missing or invalid" })
    }
    const body = request.body
    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }
    try {
        const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
        response.json(Blog.format(updatedBlog))
    } catch (exception) {
        response.status(400).send({ error: "malformatted id" })
    }

})






module.exports = blogsRouter