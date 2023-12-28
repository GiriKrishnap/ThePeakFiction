import { baseUrl, signupPost } from '../../../util/constants'
import {
    USER_SIGNUP_REQUEST,
    USER_SIGNUP_SUCCESS,
    USER_SIGNUP_FAILURE,
} from '../../Constants/userConstants'

import axios from 'axios'

const API = axios.create({ baseURL: baseUrl });

export const userSignup = (userName, email, password, isAuthor) => async (dispatch) => {
    try {
        dispatch({ type: USER_SIGNUP_REQUEST });
        const config = {
            headers: {
                "Content-type": "application/json",
            }
        }

        const { data } = await API.post(signupPost, { userName, email, password, isAuthor }, config);

        console.log('-----USER_SIGNUP_SUCCESS------------')
        dispatch({
            type: USER_SIGNUP_SUCCESS,
            payload: data
        })

    } catch (error) {
        console.log('-----USER_SIGNUP_FAILURE------------');
        dispatch({
            type: USER_SIGNUP_FAILURE,
            payload: error.response.data
        })
    }
}

