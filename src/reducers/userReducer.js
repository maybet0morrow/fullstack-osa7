import userService from "../services/users"

const userReducer = (store =[], action) => {
    switch (action.type){
    case "INIT_USERS":
        return action.data
    default:
        return store
    }
}

export const initUsers = () => {
    console.log("initing users")
    return async (dispatch) => {
        const users = await userService.getAll()
        dispatch({
            type: "INIT_USERS",
            data: users
        })
    }
}

export default userReducer