import loginService from "../services/login"
import blogService from "../services/blogs"
import { notify } from "./notificationReducer"


const loginReducer = (state = null, action) => {
    switch(action.type){
    case "LOGIN":
        return action.data
    case "LOGOUT":
        return null
    case "INIT_USER":
        return action.data
    default:
        return state
    }
}

export const login = (username, password) => {
    return async (dispatch) => {
        try{
            const user = await loginService.login({
                username,
                password
            })
            console.log(JSON.stringify(user))
            window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user))
            blogService.setToken(user.token)

            console.log("user set to", user)
            dispatch({
                type: "LOGIN",
                data: user
            })
        }catch(exception){
            notify("Login failed...", true, 5)
        }




    }
}

export const logout = () => {
    // does this even need to be async??? Ei minusta
    return async (dispatch) => {


        console.log("user set to null")
        window.localStorage.removeItem("loggedBlogAppUser")
        dispatch({
            type: "LOGOUT",
            data: null
        })
        notify("Success",false,5)

    }
}

export const initLoggedUser = (user) => {
    return(dispatch) => {
        dispatch({
            type: "INIT_USER",
            data: user

        })
    }

}

export default loginReducer