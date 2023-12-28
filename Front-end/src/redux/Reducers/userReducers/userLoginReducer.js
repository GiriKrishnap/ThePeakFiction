import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAILURE,
    USER_LOGOUT
} from '../../Constants/userConstants'



export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return { loading: true }
        case USER_LOGIN_SUCCESS:
            return { loading: false, userLoginDetails: action.payload }
        case USER_LOGIN_FAILURE:
            return { loading: false, error: action.payload }
        case USER_LOGOUT:
            return { userLoginDetails: false }
        default:
            return state
    }
}