import axios from "axios"
const baseUrl = "/api/login"

const login = async (credentials) => {
    const response = await axios.post(baseUrl, credentials)
    console.log("loggin in")
    return response.data
}

export default { login }