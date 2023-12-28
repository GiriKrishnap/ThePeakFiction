import { applyMiddleware, combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { composeWithDevTools } from '@redux-devtools/extension';
import { thunk } from 'redux-thunk'

import { userSignupReducer } from './Reducers/userReducers/userSignupReducer'
import { userLoginReducer } from "./Reducers/userReducers/userLoginReducer";

const reducer = combineReducers({
    userSignup: userSignupReducer,
    userLogin: userLoginReducer
})

let userData = JSON.parse(localStorage.getItem('user-login'))
let adminInfo = JSON.parse(localStorage.getItem('adminInfo'))


const initialState = {
    userLogin: { userLoginDetails: userData },
    adminLogin: { adminLoginDetails: adminInfo }
};
const composedEnhancer = composeWithDevTools(applyMiddleware(thunk))

const store = configureStore({ reducer, initialState, composedEnhancer })

export default store;