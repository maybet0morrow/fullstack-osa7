const Blog = require("../models/blog")
const User = require("../models/user")
const Comment = require("../models/comment")

const initialBlogs = [
    {

        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,

    },
    {

        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,


    },
    {

        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,


    },
    {

        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,

    },
    {
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,

    }
]
/*
const initialUsers = [
    {
        username: "nimpio",
        name: "Niklas Impiö",
        password: "asdasd",
        adult: true,

    },
    {
        username: "essie",
        name: "Essi Esimerkki",
        password: "asdasd",
        adult: false
    }
]
*/
const formatUser = (user) => {
    return {
        id: user._id,
        username: user.username,
        name: user.name,
        adult: user.adult
    }
}

const format = (blog) => {
    return {
        id: blog._id,
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes,
        user : blog.user,
        comments: blog.comments
    }
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(formatUser)
}

const nonExistingId = async () => {
    const blog = new Blog()
    await blog.save()
    await blog.remove()

    return blog._id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(format)
}

const commentsInDb = async () => {
    const comments = await Comment.find({})
    return comments.map(formatComment)
}

const formatComment = (comment) => {
    return{
        id: comment._id,
        content: comment.content,
        date: comment.date,
        blog: comment.blog
    }
}

module.exports = {
    initialBlogs, format, nonExistingId, blogsInDb, usersInDb, commentsInDb
}