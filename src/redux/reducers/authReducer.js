import setAxiosAuthHeader from '../../utils/set-axios-auth-header';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    token: null,
    isAuthenticated: false,
    isLoading: false,
    user: null,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.DEFAULT_AUTH:
            return action.payload
        case actionTypes.USER_LOADING:
            return {
                ...state,
                isLoading: true,
            }
        case actionTypes.USER_LOADED:
            return {
                ...state,
                isLoading: false,
                isAuthenticated: true,
                user: action.payload.user
            }
        case actionTypes.AUTH_ERROR:
        case actionTypes.LOGIN_FAIL:
        case actionTypes.SIGNUP_FAIL:
        case actionTypes.LOGOUT:
            setAxiosAuthHeader()
            return {
                isLoading: false,
                token: null,
                isAuthenticated: false,
                user: null,
            }
        case actionTypes.LOGIN_SUCCESS:
        case actionTypes.SIGNUP_SUCCESS:
            setAxiosAuthHeader(action.payload.token)
            return {
                isLoading: false,
                token: action.payload.token,
                isAuthenticated: true,
                user: action.payload.user,
            }
        default:
            return state
    }
}