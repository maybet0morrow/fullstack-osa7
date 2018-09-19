// Had some problems with how to get react-router working in production build.
// Needed to do catchAll middleware, which redirects stuff to build/index so that react router can handle urls

const path = require("path")
const logger = (request, response, next) => {
    if( process.env.NODE_ENV === "test" ){
        return next()
    }
    console.log("Method:", request.method)
    console.log("Path:  ", request.path)
    console.log("Body:  ", request.body)
    console.log("---")
    next()
}

const catchAllReRoute = (request, response) => {
    //heroku possibly doesn't like __dirname that works locally???
    response.sendFile(path.join(__dirname, "../build/index.html"), function(err) {
        console.log(__dirname)
        if (err) {
            response.status(500).send(err)
        }
    })
}



const error = (request, response) => {
    response.status(404).send({ error: "unknown endpoint" })
}

const tokenExtractor = (request, response, next) => {
    const authorization = request.get("authorization")
    if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
        const token =  authorization.substring(7)
        request.token = token
    }
    console.log("tokenExtracted")

    next()

}


module.exports = {
    logger,
    error,
    tokenExtractor,
    catchAllReRoute
}