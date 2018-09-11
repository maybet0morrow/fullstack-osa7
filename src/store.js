
import { createStore, combineReducers, applyMiddleware  } from "../node_modules/redux"
import thunk from "redux-thunk"

import blogReducer from "./reducers/blogReducer"
import notificationReducer from "./reducers/notificationReducer"
import loginReducer from "./reducers/loginReducer"
import userReducer from "./reducers/userReducer"
import commentReducer from "./reducers/commentReducer"

const reducer = combineReducers({
    blogs : blogReducer,
    notification : notificationReducer,
    user: loginReducer,
    users: userReducer,
    comments: commentReducer


})
const store = createStore(
    reducer,
    applyMiddleware(thunk)
)

export default store