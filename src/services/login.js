//@flow
import axios from "axios"
const baseUrl = "/api/login"

const login = async (credentials:Object) => {
    const response = await axios.post(baseUrl, credentials)
    console.log("loggin in")
    return response.data
}

export default { login }