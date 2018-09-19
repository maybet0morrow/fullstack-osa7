const listHelper = require("../utils/list_helper")
const blogs = [
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
    },
    {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
    },
    {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0
    },
    {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0
    },
    {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0
    }
]

const arrayOfOne = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
    }
]
//TODO Remove describe.skip
describe.skip("dummyTests", () => {
    describe("Total likes test", () => {
        test("of empty list is zero", () => {
            const result = listHelper.totalLikes([])
            expect(result).toBe(0)
        })

        test("list of one blog", () => {

            const result = listHelper.totalLikes(arrayOfOne)
            expect(result).toBe(7)
        })

        test("of a bigger list is calculated right", () => {

            const result = listHelper.totalLikes(blogs)
            expect(result).toBe(29)
        })
    })

    describe("Favorite Blog test", () => {
        test("of empty list", () => {
            const result = listHelper.favouriteBlog([])
            expect(result).toEqual("Empty Array")
        })

        test("list of one blog", () => {

            const result = listHelper.favouriteBlog(arrayOfOne)
            expect(result).toEqual(arrayOfOne[0])
        })

        test("of a bigger list is calculated right", () => {

            const result = listHelper.favouriteBlog(blogs)
            expect(result).toEqual(blogs[1])
        })

    })

    describe("Most Blogs test", () => {
        test("of empty list", () => {
            const result = listHelper.mostBlogs([])
            expect(result).toEqual({ author: "Empty Array", blogs: 0 })
        })

        test("list of one blog", () => {

            const result = listHelper.mostBlogs(arrayOfOne)
            expect(result).toEqual({ author: arrayOfOne[0].author, blogs: 1 })
        })

        test("of a bigger list is calculated right", () => {

            const result = listHelper.mostBlogs(blogs)
            expect(result).toEqual({ author: blogs[2].author, blogs: 3 })
        })

    })

    describe("Most Likes test", () => {
        test("of empty list", () => {
            const result = listHelper.mostLikes([])
            expect(result).toEqual({ author: "Empty Array", likes: 0 })
        })

        test("list of one blog", () => {

            const result = listHelper.mostLikes(arrayOfOne)
            expect(result).toEqual({ author: arrayOfOne[0].author, likes: 7 })
        })

        test("of a bigger list is calculated right", () => {

            const result = listHelper.mostLikes(blogs)
            expect(result).toEqual({ author: blogs[0].author, likes: 17 })
        })

    })
})


