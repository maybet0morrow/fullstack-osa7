import blogService from "./../services/blogs"

const blogReducer = (store = [], action) => {
    switch (action.type){
        case "LIKE": {
            
            const old = store.filter(a => a.id !== action.data.id)
            const liked = store.find(a => a.id === action.data.id)
            
            return [...old, { ...liked, likes: liked.likes +1 }]
        }
        case "CREATE":
            return [...store, action.data]
        case "DELETE":
            let index = 0
            const ids = store.map(a => a.id)
            
            for(let i=0;i<ids.length;i++){
                console.log(ids[i],action.data.id)
                if(ids[i] === action.data.id){
                    index = i
                }
            }
            store.splice(index,1)
            console.log(store)
            return store
            
        case "INIT_BLOGS":
            return action.data
        default:
            return store
    }
}

export const initBlogs = () => {
    console.log("initing blogs")
    return async (dispatch) => {
        const blogs = await blogService.getAll()
        dispatch({
            type: "INIT_BLOGS",
            data: blogs
        })
    }
}

export const createBlog = (blogObject) => {
    return async (dispatch) => {
        const newBlog = await blogService.create(blogObject)
        dispatch({
            type: "CREATE",
            data: newBlog
        })
    }
}

export const likeBlog = (blog) => {
    console.log("liking",blog.title)
    return async (dispatch) => {
        const updated = await blogService.update(blog)
        
        dispatch({
            type: "LIKE",
            data: updated
        })
    }
}
export const deleteBlog = (blog) => {
    console.log("deleting", blog)
    try{
        return async (dispatch) => {
            await blogService.deleteBlog(blog)
            
            dispatch({
                type: "DELETE",
                data: blog
            })
        }
    }catch(exception){
        console.log("asd")
    }
    
}



export default blogReducer