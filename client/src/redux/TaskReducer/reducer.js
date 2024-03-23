import { CREATE_TASK_ERROR,CREATE_TASK_REQUEST,CREATE_TASK_SUCCESS,GET_TASK_ERROR,GET_TASK_REQUEST,GET_TASK_SUCCESS,UPDATE_TASK_ERROR,UPDATE_TASK_REQUEST,UPDATE_TASK_SUCCESS,DELETE_TASK_ERROR,DELETE_TASK_REQUEST,DELETE_TASK_SUCCESS } from "./actionTypes";

const init = {
    isLoading: false,
    isError:false,
    data:[],
}

export const reducer = (state=init,{type,payload})=>{
   switch(type){
    case CREATE_TASK_REQUEST : return {...state, isLoading:true}
    case CREATE_TASK_SUCCESS: return {...state, isLoading:false, data:payload}
    case CREATE_TASK_ERROR: return {...state,isLoading:false, isError:true}

    case UPDATE_TASK_REQUEST: return {...state, isLoading:true}
    case UPDATE_TASK_SUCCESS : return {...state, isLoading:false, data:payload}
    case UPDATE_TASK_ERROR : return {...state, isLoading:false, isError:true}
   
    case GET_TASK_REQUEST: return {...state, isLoading:true}
    case GET_TASK_SUCCESS : return {...state, isLoading:false, data:payload}
    case GET_TASK_ERROR : return {...state, isLoading:false, isError:true}

    case DELETE_TASK_REQUEST: return{...state,isLoading:true}
    case DELETE_TASK_SUCCESS:return{...state,isLoading:false,data:payload}
    case DELETE_TASK_ERROR: return{...state,isLoading:false,isError:true}

    default: return state
   }
}