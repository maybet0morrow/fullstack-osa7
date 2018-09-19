const supertest = require("supertest")
const { app, server } = require("../index")
const api = supertest(app)
const Blog = require("../models/blog")
const User = require("../models/user")
const Comment = require("../models/comment")
const { initialBlogs, blogsInDb, usersInDb, commentsInDb } = require("./test_helper")


let token = null
describe("Tests", async () => {
    describe("With one user in DB initially", async () => {
        beforeAll(async () => {
            await User.remove({})

            const user = new User({
                username: "root",
                name: "Mr Root",
                password: "asdasd",
                adult: "true"
            })
            await user.save()
        })
        describe("adding new user", async () => {
            test("POST /api/users succeeds with valid data", async () => {
                const usersAtStart = await usersInDb()
                const newUser = {
                    username: "nimpio",
                    name: "Niklas Impiö",
                    password: "asdasd",
                    adult: true,

                }
                const newUserWithoutAdult = {
                    username: "addUserTestWithoutAdult",
                    name: "test",
                    password: "asd",

                }

                await api
                    .post("/api/users")
                    .send(newUser)
                    .expect(200)
                    .expect("Content-Type", /application\/json/)
                await api
                    .post("/api/users")
                    .send(newUserWithoutAdult)
                    .expect(200)
                    .expect("Content-Type", /application\/json/)
                const usersAfter = await usersInDb()
                expect(usersAfter.length).toBe(usersAtStart.length + 2)

                const usernames = usersAfter.map(r => r.username)
                expect(usernames).toContain("nimpio")
                expect(usernames).toContain("addUserTestWithoutAdult")
            })

            test("Log in and extract token for later tests", async () => {
                const loginUser = {
                    username: "nimpio",
                    password: "asdasd"
                }
                const response = await api
                    .post("/api/login")
                    .send(loginUser)
                    .expect(200)
                    .expect("Content-Type", /application\/json/)

                token = response.body.token
                console.log(token)

            })

            test("POST /api/users fails with invalid data and shows proper exit codes", async () => {
                const usersAtStart = await usersInDb()
                const newUserWithShortPassword = {
                    username: "addUserTestShortPassword",
                    name: "test",
                    password: "as",
                    adult: true,

                }
                const newUserWithDublicateUsername = {
                    username: "nimpio",
                    name: "test",
                    password: "asd",
                    adult: true,

                }

                await api
                    .post("/api/users")
                    .send(newUserWithShortPassword)
                    .expect(400)
                    .expect("Content-Type", /application\/json/)
                await api
                    .post("/api/users")
                    .send(newUserWithDublicateUsername)
                    .expect(400)
                    .expect("Content-Type", /application\/json/)
                const usersAfter = await usersInDb()
                expect(usersAfter.length).toBe(usersAtStart.length)

                const usernames = usersAfter.map(r => r.username)
                expect(usernames).not.toContain("addUserTestShortPassword")

            })
        })
        test("All users are returned as JSON by GET /api/users", async () => {
            const usersInDatabase = await usersInDb()

            const response = await api
                .get("/api/users")
                .expect(200)
                .expect("Content-Type", /application\/json/)
            expect(response.body.length).toBe(3)
            const returnedUsernames = response.body.map(n => n.username)
            usersInDatabase.forEach(users => {
                expect(returnedUsernames).toContain(users.username)
            })

        })
    })


    beforeAll(async () => {
        await Blog.remove({})

        const blogObjects = initialBlogs.map(n => new Blog(n))
        await Promise.all(blogObjects.map(n => n.save()))
    })

    test("All blogs are returned as JSON by GET /api/blogs", async () => {
        const blogsInDatabase = await blogsInDb()

        const response = await api
            .get("/api/blogs")
            .expect(200)
            .expect("Content-Type", /application\/json/)
        expect(response.body.length).toBe(initialBlogs.length)
        const returnedTitles = response.body.map(n => n.title)
        blogsInDatabase.forEach(blogs => {
            expect(returnedTitles).toContain(blogs.title)
        })

    })

    describe("adding new Blog", async () => {
        test("POST /api/blogs succeeds with valid data", async () => {
            const blogsAtStart = await blogsInDb()

            const newBlog = {
                title: "POST_TEST",
                author: "THIS TEST FUNCTION",
                url: "127.0.0.1",
                likes: "0"
            }
            const newBlogWithoutLikes = {
                title: "MISSING_LIKES_TEST",
                author: "THIS TEST FUNCTION",
                url: "127.0.0.1"
            }
            await api
                .post("/api/blogs")
                .send(newBlog)
                .set({ "Authorization" : `Bearer ${token}` })
                .expect(200)
                .expect("Content-Type", /application\/json/)
            await api
                .post("/api/blogs")
                .send(newBlogWithoutLikes)
                .set({ "Authorization" : `Bearer ${token}` })
                .expect(200)
                .expect("Content-Type", /application\/json/)
            const blogsAfter = await blogsInDb()
            expect(blogsAfter.length).toBe(blogsAtStart.length + 2)

            const titles = blogsAfter.map(r => r.title)
            expect(titles).toContain("POST_TEST")
            expect(titles).toContain("MISSING_LIKES_TEST")
        })

        test("POST fails with undefined url, title or author", async () => {
            const blogsAtStart = await blogsInDb()
            const blogMissingAuthor = {
                title: "POST_TEST",
                url: "127.0.0.1",
                likes: "0"
            }
            const blogMissingTitle = {
                author: "THIS TEST FUNCTION",
                url: "127.0.0.1",
                likes: "0"
            }
            const blogMissingURL = {
                title: "POST_TEST",
                author: "THIS TEST FUNCTION",
                likes: "0"
            }

            await api
                .post("/api/blogs")
                .send(blogMissingAuthor)
                .set({ "Authorization" : `Bearer ${token}` })
                .expect(400)
                .expect("Content-Type", /application\/json/)
            await api
                .post("/api/blogs")
                .send(blogMissingTitle)
                .set({ "Authorization" : `Bearer ${token}` })
                .expect(400)
                .expect("Content-Type", /application\/json/)
            await api
                .post("/api/blogs")
                .send(blogMissingURL)
                .set({ "Authorization" : `Bearer ${token}` })
                .expect(400)
                .expect("Content-Type", /application\/json/)
            const blogsAfter = await blogsInDb()
            expect(blogsAfter.length).toBe(blogsAtStart.length)

        })
    })

    describe("Deleting blog", async () => {
        let addedBlog
        beforeAll(async () => {
            addedBlog = new Blog({
                title: "DELETE_TEST",
                author: "THIS TEST FUNCTION",
                url: "127.0.0.1",
                likes: "0"
            })
            await addedBlog.save()
        })

        test("DELETE /api/blogs/:id succeeds with proper statuscode", async () => {
            const blogsStart = await blogsInDb()

            await api
                .delete(`/api/blogs/${addedBlog._id}`)
                .expect(204)
            const blogsAfter = await blogsInDb()
            const titles = blogsAfter.map(r => r.title)

            expect(blogsAfter.length).toBe(blogsStart.length - 1)
            expect(titles).not.toContain(addedBlog.title)
        })
    })
    describe("Deleting blog with defined user", async () => {
        let addedBlog
        let addedBlogWithDifferentId
        beforeAll(async () => {
            const users = await usersInDb()
            console.log("ASDASD", users)
            const loggedInUser = users.find(a =>  a.username === "nimpio" )
            const notLoggedInUser = users.find(a =>  a.username === "root" )
            addedBlog = new Blog({
                title: "DELETE_TEST_WITH_USER",
                author: "THIS TEST FUNCTION",
                url: "127.0.0.1",
                likes: "0",
                user: loggedInUser.id
            })
            await addedBlog.save()

            addedBlogWithDifferentId = new Blog({
                title: "DELETE_TEST_WITH_DIFFERENT_USER",
                author: "THIS TEST FUNCTION",
                url: "127.0.0.1",
                likes: "0",
                user: notLoggedInUser.id
            })
            await addedBlogWithDifferentId.save()
        })

        test("DELETE /api/blogs/:id with defined user succeeds with proper statuscode", async () => {
            const blogsStart = await blogsInDb()
            console.log("things",addedBlog)
            await api
                .delete(`/api/blogs/${addedBlog._id}`)
                .set({ "Authorization" : `Bearer ${token}` })
                .expect(204)
            const blogsAfter = await blogsInDb()
            const titles = blogsAfter.map(r => r.title)

            expect(blogsAfter.length).toBe(blogsStart.length - 1)
            expect(titles).not.toContain(addedBlog.title)
        })

        test("DELETE /api/blogs/:id with defined user succeeds with proper statuscode", async () => {
            const blogsStart = await blogsInDb()
            console.log("stuff", addedBlogWithDifferentId)
            await api
                .delete(`/api/blogs/${addedBlogWithDifferentId._id}`)
                .set({ "Authorization" : `Bearer ${token}` })
                .expect(401)
            const blogsAfter = await blogsInDb()
            const titles = blogsAfter.map(r => r.title)

            expect(blogsAfter.length).toBe(blogsStart.length)
            expect(titles).toContain(addedBlogWithDifferentId.title)
        })
    })

    describe("Updating blog", async () => {
        let originalBlog
        beforeAll(async () => {
            originalBlog = new Blog({
                title: "UPDATE_TEST_BEFORE",
                author: "ASD",
                url: "TESTURL",
                likes: 1,
            })
            await originalBlog.save()
        })

        test("UPDATE /api/blogs/:id succeeds with proper statuscode", async () => {
            const blogsStart = await blogsInDb()
            const updatedBlog = new Blog({
                title: "UPDATE_TEST_AFTER",
                author: "ASD",
                url: "TESTURL",
                likes: 1
            })
            await api
                .put(`/api/blogs/${originalBlog._id}`)
                .send(updatedBlog)
                .set({ "Authorization" : `Bearer ${token}` })
                .expect(200)
            const blogsAfter = await blogsInDb()
            const titles = blogsAfter.map(r => r.title)

            expect(blogsAfter.length).toBe(blogsStart.length)
            expect(titles).toContain(updatedBlog.title)
        })

    })

    describe("Comment tests", async () => {
        let originalBlog
        let comment
        beforeAll(async () => {
            await Comment.remove({})
            originalBlog = new Blog({
                title: "Comment_TEST_blog",
                author: "ASD",
                url: "TESTURL",
                likes: 1,
            })
            await originalBlog.save()

            comment = new Comment({
                content: "test comment",
                blog: originalBlog._id
            })
            await comment.save()

        })

        test("All comments are returned as JSON by GET /api/blogs/all_comments", async () => {
            const commentsInDbBefore = await commentsInDb()

            const response = await api
                .get("/api/blogs/all_comments")
                .expect(200)
                .expect("Content-Type", /application\/json/)
            expect(response.body.length).toBe(commentsInDbBefore.length)
            const returnedContents = response.body.map(n => n.content)
            commentsInDbBefore.forEach(comment => {
                expect(returnedContents).toContain(comment.content)
            })

        })

        test("POST /api/blogs/:id/comments with valid data succeeds with valid statuscode", async () => {
            const commentsInDbBefore = await commentsInDb()
            const newComment = {
                content: "POST_TEST_COMMENT"
            }
            console.log(originalBlog)
            await api
                .post(`/api/blogs/${originalBlog._id}/comments`)
                .send(newComment)
                .set({ "Authorization" : `Bearer ${token}` })
                .expect(200)
                .expect("Content-Type", /application\/json/)
            const commentsDbAfter = await commentsInDb()
            const contents = commentsDbAfter.map(a => a.content)
            expect(commentsInDbBefore.length + 1).toEqual(commentsDbAfter.length)
            expect(contents).toContain(newComment.content)
        })

    })




    afterAll(() => {
        server.close()
    })
})
