import { GET_USER_ERROR, GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_ERROR, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_ERROR, LOGOUT_REQUEST, LOGOUT_SUCCESS, REGISTER_ERROR, REGISTER_REQUEST, REGISTER_SUCCESS, RELOGIN_ERROR, RELOGIN_REQUEST, RELOGIN_SUCCESS } from "./actionTypes";
import axios from 'axios';

const userURL = import.meta.env.VITE_BACKEND_URL

export const Signup = (userData, navigate) => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_REQUEST })
        await axios.post(`${userURL}/user/register`, userData,
            {
                headers: { "Content-Type": "multipart/form-data" }
            })
            .then((res) => {
                dispatch({ type: REGISTER_SUCCESS, payload: res })
                localStorage.setItem('token', (res.data.token))
                navigate('/tasks')
            })
    } catch (err) {
        dispatch({ type: REGISTER_ERROR })
        console.log(err)
    }
}

export const Signin = (userData, navigate) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST })
        await axios.post(`${userURL}/user/login`, userData)
        .then((res) => {
            dispatch({ type: LOGIN_SUCCESS, payload: res })
            localStorage.setItem('token', (res.data.token))
            console.log(res);
            navigate('/tasks')
        })
    } catch (err) {
        dispatch({ type: LOGIN_ERROR })
        console.log(err.message);
    }

}

export const Logout = (token) => async (dispatch) => {
    dispatch({ type: LOGOUT_REQUEST })
    await axios.get(`${userURL}/user/logout`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            dispatch({ type: LOGOUT_SUCCESS, payload: res })
            localStorage.removeItem('token')
        }).catch((err) => {
            dispatch({ type: LOGOUT_ERROR })
            console.log(err)
        })
}

export const Relogin = (token) => async (dispatch) => {
    dispatch({ type: RELOGIN_REQUEST })
    await axios.get(`${userURL}/user/relogin`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            dispatch({ type: RELOGIN_SUCCESS, payload: res })
        }).catch((err) => {
            dispatch({ type: RELOGIN_ERROR })
            console.log(err)
        })
}
export const GetUser = (token) => async (dispatch) => {
    dispatch({ type: GET_USER_REQUEST })
    await axios.get(`${userURL}/user`,
        {
            headers: { Authorization: `Bearer ${token}` }
        }).then((res) => {
            dispatch({ type: GET_USER_SUCCESS, payload: res })
        }).catch((err) => {
            dispatch({ type: GET_USER_ERROR })
            console.log(err)
        })
}
export const EditProfile = (token,name) => async (dispatch) => {
    dispatch({ type: RELOGIN_REQUEST })
    await axios.patch(`${userURL}/user/edit`, {name},
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            dispatch({ type: RELOGIN_SUCCESS, payload: res })
            dispatch(GetUser(token))
        }).catch((err) => {
            dispatch({ type: RELOGIN_ERROR })
            console.log(err)
        })
}