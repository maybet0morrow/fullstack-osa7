import blogReducer from "./blogReducer"
import "../setupTest"



const blogs = [
    {
        author: "Essi Esimerkki",
        id: "5b86e659e8be4b3a8818a1bc",
        likes: 0,
        title: "Esimerkki Blogi",
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
        title: "Toinen Esimerkki",
        url: "http://localhost:3000",
        user: {
            _id: "321321321",
            username: "nimpio",
            name: "Niklas Impiö"
        }
    }
]


describe("blogReducer", () => {

    it("should return initialState", () => {
        expect(blogReducer(undefined, {})).toEqual([])
    })

    it("should handle INIT_BLOGS", () => {
        const initAction = {
            type: "INIT_BLOGS",
            data: blogs
        }
        expect(blogReducer([], initAction)).toEqual(blogs)
    })

    it("should handle LIKE", () => {
        const likedBlog = { ...blogs[0] }

        const likeAction = {
            type: "LIKE",
            data: likedBlog
        }
        const expectedBlog = { ...likedBlog }
        expectedBlog.likes += 1
        expect(blogReducer(blogs, likeAction).map(a => a.id)).toContain(expectedBlog.id)
        expect(blogReducer(blogs, likeAction).find(a => a.id === expectedBlog.id).likes).toEqual(expectedBlog.likes)
    })

    it("should handle Create", () => {
        const newBlog = {
            author: "Niklas Impiö",
            id: "123456789",
            likes: 12,
            title: "TestiBlogi",
            url: "https://fullstackopen.github.io/osa5/",
            user: {
                _id: "987654321",
                username: "nimpio",
                name: "Niklas Impiö"
            }
        }

        const createAction = {
            type: "CREATE",
            data: newBlog
        }

        expect(blogReducer(blogs, createAction).length).toEqual(blogs.length + 1)
        expect(blogReducer(blogs, createAction)).toContain(newBlog)
    })

    it("should handle Create", () => {
        const toBeDeleted = {
            author: "Niklas Impiö",
            id: "5b86e12341458a1bc",
            likes: 1,
            title: "Toinen Esimerkki",
            url: "http://localhost:3000",
            user: {
                _id: "321321321",
                username: "nimpio",
                name: "Niklas Impiö"
            }
        }

        const deleteAction = {
            type: "DELETE",
            data: toBeDeleted
        }
        expect(blogReducer(blogs.concat(), deleteAction).length).toEqual(blogs.length -1)
        expect(blogReducer(blogs.concat(), deleteAction)).not.toContain(toBeDeleted)
    })






})