import { CREATE_TASK_REQUEST, DELETE_TASK_REQUEST, GET_TASK_ERROR, GET_TASK_REQUEST, GET_TASK_SUCCESS, UPDATE_TASK_REQUEST } from "./actionTypes"
import axios from 'axios';

const userURL = import.meta.env.VITE_BACKEND_URL
export const GetTask = (token) => async (dispatch) => {
    try {
        dispatch({ type: GET_TASK_REQUEST })
        await axios.get(`${userURL}/task/`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                dispatch({ type: GET_TASK_SUCCESS, payload: res.data })
            })
    } catch (err) {
        dispatch({ type: GET_TASK_ERROR })
        console.log(err);
    }
}
export const UpdateTask = (id,task,token) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_TASK_REQUEST })
        await axios.patch(`${userURL}/task/${id}`, task, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                dispatch({ type: UPDATE_TASK_REQUEST, payload: res })
                dispatch(GetTask(token))
            })
    } catch (err) {
        dispatch({ type: UPDATE_TASK_REQUEST })
        console.log(err);
    }
}
export const DeleteTask = (task,token) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_TASK_REQUEST })
        await axios.delete(`${userURL}/task/${task}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                dispatch({ type: DELETE_TASK_REQUEST, payload: res })
                dispatch(GetTask(token))
            })
    } catch (err) {
        dispatch({ type: DELETE_TASK_REQUEST })
        console.log(err);
    }
}
export const CreateTask = (task,token) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_TASK_REQUEST })
        await axios.post(`${userURL}/task/`,task, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                dispatch({ type: CREATE_TASK_REQUEST, payload: res })
                dispatch(GetTask(token))
            })
    } catch (err) {
        dispatch({ type: CREATE_TASK_REQUEST })
        console.log(err);
    }
}