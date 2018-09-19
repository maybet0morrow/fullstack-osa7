const dummy = (blogs) => {

    return blogs.length === 1 ? blogs.length : 1
}


const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + Number(item.likes)
    }
    return blogs.length === 0? 0: blogs.reduce(reducer,0)
}

const favouriteBlog = (blogs) => {
    let currentFavourite = "Empty Array"
    let currentLikes = 0
    blogs.forEach(element => {
        if(element.likes >= currentLikes){
            currentFavourite = element
            currentLikes = element.likes
        }
    })
    return currentFavourite

}

const mostBlogs = (blogs) => {
    const blogsSimple = []

    blogs.forEach(element => {
        blogsSimple.push({ author:element.author, blogs:1 })
    })


    blogsSimple.forEach(element => {
        blogsSimple.filter(object => {
            if((element.author === object.author) &&(element !== object)){
                element.blogs += object.blogs
                blogsSimple.splice(blogsSimple.indexOf(object),1)

            }
        })
    })

    let winningAuthor = "Empty Array"
    let winningScore = 0
    blogsSimple.forEach(element => {
        if((element.blogs >= winningScore)){
            winningAuthor = element.author
            winningScore = element.blogs
        }
    })

    console.log(winningAuthor, winningScore)


    return { author:winningAuthor, blogs:winningScore }

}

const mostLikes = (blogs) => {
    const blogsSimple = []

    blogs.forEach(element => {
        blogsSimple.push({ author:element.author, likes:element.likes })
    })


    blogsSimple.forEach(element => {
        blogsSimple.filter(object => {
            if((element.author === object.author) &&(element !== object)){
                element.likes += object.likes
                blogsSimple.splice(blogsSimple.indexOf(object),1)

            }
        })
    })

    let winningAuthor = "Empty Array"
    let winningScore = 0
    blogsSimple.forEach(element => {
        if((element.likes >= winningScore)){
            winningAuthor = element.author
            winningScore = element.likes
        }
    })

    console.log(winningAuthor, winningScore)


    return { author:winningAuthor, likes:winningScore }

}

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    mostBlogs,
    mostLikes
}