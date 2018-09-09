import axios from "axios"
const baseUrl = "/api/users"

const getAll = async () => {
    const response = await axios.get(baseUrl)
    console.log("getting all users")
    return response.data
}


export default { getAll }