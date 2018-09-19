const http = require("http")
const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const cors = require("cors")
const mongoose = require("mongoose")
const blogsRouter = require("./controllers/blogs")
const usersRouter = require("./controllers/users")
const loginRouter = require("./controllers/login")
const commentRouter = require("./controllers/comments")

const middleware = require("./utils/middleware")

const config = require("./utils/config")



app.use(express.static("build"))




mongoose
    .connect(config.mongoUrl, { useNewUrlParser: true })
    .then(() => {
        console.log("connected to database", config.mongoUrl)
    })
    .catch(err => {
        console.log(err)
    })


app.use(cors())

app.use(bodyParser.json())
app.use(middleware.logger)
app.use(middleware.tokenExtractor)

app.use("/api/blogs", blogsRouter)
app.use("/api/users", usersRouter)
app.use("/api/login", loginRouter)
app.use("/api/blogs", commentRouter)
app.use(middleware.catchAllReRoute)
app.use(middleware.error)



const server = http.createServer(app)

server.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`)
})

server.on("close", () => {
    mongoose.connection.close()
})




module.exports = {
    app, server
}