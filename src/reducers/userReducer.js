//@flow
import userService from "../services/users"




const userReducer = (store:Array<Object> =[], action:Object) => {
    switch (action.type){
    case "INIT_USERS":
        return action.data
    default:
        return store
    }
}

export const initUsers = () => {
    console.log("initing users")
    return async (dispatch:Function) => {
        const users = await userService.getAll()
        dispatch({
            type: "INIT_USERS",
            data: users
        })
    }
}

export default userReducer