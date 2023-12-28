import { baseUrl, loginPost } from '../../../util/constants';
import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAILURE,
    USER_LOGOUT
} from '../../Constants/userConstants'

import axios from 'axios'

const API = axios.create({ baseURL: baseUrl });

const config = {
    headers: {
        "Content-Type": "application/json",
    }
}

export const userLogin = (email, password, isAuthor) => async (dispatch) => {
    try {
        dispatch({ type: USER_LOGIN_REQUEST });
        const { data } = await API.post(loginPost, { email, password, isAuthor }, config);
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
        localStorage.setItem('user-login', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAILURE,
            payload: error.response.data
        })

    }
}


export const userLogout = () => async (dispatch) => {
    try {
        localStorage.removeItem("user-login")
        dispatch({ type: USER_LOGOUT });
    } catch (error) {
        console.log(error);
    }
}