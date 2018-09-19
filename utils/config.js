
require("dotenv").config()


let port
let mongoUrl

switch (process.env.NODE_ENV) {
case "test": {
    port = process.env.TEST_PORT
    mongoUrl = process.env.TEST_MONGODB_URI
    break
}
case "production":{
    port = process.env.PORT
    mongoUrl = process.env.MONGODB_URI
    break
}
default:{
    port = process.env.TEST_PORT
    mongoUrl = process.env.TEST_MONGODB_URI
    break
}
}


module.exports = {
    mongoUrl,
    port
}