import * as actionTypes from './actionTypes';
import * as authApi from '../../api/authApi';
import setAxiosAuthHeader from '../../utils/set-axios-auth-header';
import { Alert } from 'react-native';

export const loadUser = () => async (dispatch, getState) => {
    dispatch({ type: actionTypes.USER_LOADING })

    const token = getState().auth.token

    if (token) {
        setAxiosAuthHeader(token)
    } else {
        return dispatch({ type: actionTypes.AUTH_ERROR })
    }

    try {
        const data = await authApi.getUser()

        dispatch({ type: actionTypes.USER_LOADED, payload: data })
    } catch (err) {
        dispatch({ type: actionTypes.AUTH_ERROR })
    }

}

export const login = ({ username, password }) => async (dispatch) => {
    const body = {
        username,
        password
    }
    try {
        const data = await authApi.loginApi(body)

        dispatch({ type: actionTypes.LOGIN_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: actionTypes.LOGIN_FAIL })
    }
}

export const signup = ({ username, password }) => async (dispatch) => {
    const body = {
        username,
        password
    }
    try {
        const data = await authApi.signupApi(body)

        dispatch({ type: actionTypes.SIGNUP_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: actionTypes.SIGNUP_FAIL })
    }
}

export const deleteUser = (id) => async (dispatch) => {
    try {
        await authApi.deleteUserApi(id)

        dispatch(logout())
    } catch (err) {
        Alert.alert('Failed to delete user')
    }
}

export const logout = () => {
    return {
        type: actionTypes.LOGOUT
    }
}