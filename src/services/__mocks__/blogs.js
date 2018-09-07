let token = null
const blogs = [
    {
        author: "Essi Esimerkki",
        id: "5b86e659e8be4b3a8818a1bc",
        likes: 0,
        title:"Esimerkki Blogi",
        url: "https://fullstackopen.github.io/osa5/",
        user: {
            _id: "123123123",
            username: "eesimer",
            name: "Essi Esimerkki"
        }
    },
    {
        author: "Niklas Impiö",
        id: "5b86e12341458a1bc",
        likes: 1,
        title:"Toinen Esimerkki",
        url: "http://localhost:3000",
        user: {
            _id: "321321321",
            username: "nimpio",
            name: "Niklas Impiö"
        }
    }
]

const getAll = async () => {
    return Promise.resolve(blogs)
}
const setToken = (newToken) => {
    token = `bearer ${newToken}`
}
export default { getAll, blogs, setToken }

