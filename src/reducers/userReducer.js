import loginService from "../services/login"
import blogService from "../services/blogs"
const initialState = {
    username:"",
    password:"",
    user :null
}
const userReducer = (state = initialState, action) => {
    switch(action.type){
        case "LOGIN":
            return action.data
        case "LOGOUT":
            return initialState
        case "INIT_USER":
            return action.data
        default:
            return state
    }
}

export const login = (username, password) => {
    return async (dispatch) => {
        
        const user = await loginService.login({
            username,
            password
        })
        window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
        blogService.setToken(user.token)
        
        console.log("user set to", user)
        dispatch({
            type: "LOGIN",
            data: user
        })
        
    }
}

export const logout = () => {
    // does this even need to be async??? Ei minusta
    return async (dispatch) => {
        try {
            
            console.log("user set to null")
            window.localStorage.removeItem("loggedBlogAppUser")
            dispatch({
                type: "LOGOUT",
                data: null
            })
        } catch (exception) {
            
        
        }
    }
}

export const initUser = (user) => {
    return(dispatch) => {
        dispatch({
            type: "INIT_USER",
            data: user
            
        })
    }
    
}

export default userReducer