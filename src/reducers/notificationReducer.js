const initialState = {message: null, error: false}
const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
    case "SET_NOTIFICATION":
        return action.data
    default:
        return state
    }
}


export const notify = (message, error, seconds) => {
    console.log("setting notification:",message)
    return (dispatch) => {
        dispatch({
            type: "SET_NOTIFICATION",
            data: {
                message: message,
                error: error
            }
        })
        setTimeout(() => {
            dispatch({
                type: "SET_NOTIFICATION",
                data: {
                    message: null,
                    error: false
                }
            })
        },seconds*1000)
    }
}

export default notificationReducer