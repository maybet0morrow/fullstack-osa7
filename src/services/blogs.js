import axios from "axios"
const baseUrl = "/api/blogs"

let token = null

const getAll = async () => {
    const response = await axios.get(baseUrl)
    console.log("getting all Blogs")
    return response.data
}

const setToken = (newToken) => {
    token = `bearer ${newToken}`
}

const create = async (newObject) => {
    const config = {
        headers: { "Authorization": token }
    }

    const response = await axios.post(baseUrl, newObject, config)

    return response.data
}

const update = async (newObject) => {
    const config = {
        headers: { "Authorization": token }
    }
    newObject = { ...newObject, likes: newObject.likes + 1 }

    const response = await axios.put(`${baseUrl}/${newObject.id}`,newObject, config)

    return response.data
}

const deleteBlog = async(object2bRemoved) => {
    const config = {
        headers: { "Authorization": token }
    }

    const response = await axios.delete(`${baseUrl}/${object2bRemoved.id}`, config)

    return response
}



export default { getAll, setToken, create, update, deleteBlog }