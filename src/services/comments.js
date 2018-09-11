import axios from "axios"
const baseUrl = "/api/blogs/"
const baseUrlAll = "/api/blogs/all_comments"

let token = null

const getAll = async () => {
    const response = await axios.get(baseUrlAll)
    console.log("getting all comments.")

    return response.data
}
const setToken = (newToken) => {
    token = `bearer ${newToken}`

}

const create = async (comment, blogID) => {
    const config = {
        headers: { "Authorization": token }
    }

    const response = await axios.post(`${baseUrl}/${blogID}/comments`, comment, config)
    console.log(response.data)
    return response.data
}




export default { getAll, create, setToken }