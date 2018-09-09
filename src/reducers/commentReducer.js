import commentService from "../services/comments"

const commentReducer = (store = [], action) => {
    switch(action.type){
    case "CREATE_COMMENT":
        return [...store, action.data]
    case "INIT_COMMENTS":
        return action.data
    default:
        return store
    }
}

export const initComments = () => {
    console.log("initing comments")
    return async (dispatch) => {
        const comments = await commentService.getAll()
        dispatch({
            type: "INIT_COMMENTS",
            data: comments
        })
    }
}

export const createComment = (commentObject, blogID) => {
    return async (dispatch) => {
        const newComment = await commentService.create(commentObject, blogID)
        dispatch({
            type: "CREATE_COMMENT",
            data: newComment
        })
    }
}

export default commentReducer