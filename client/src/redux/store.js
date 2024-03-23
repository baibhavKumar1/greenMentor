import { legacy_createStore, applyMiddleware ,combineReducers} from "redux";
import  {thunk}  from "redux-thunk";
 import { reducer as AuthReducer } from "./AuthReducer/reducer";
 import { reducer as TaskReducer } from "./TaskReducer/reducer";

const rootReducer= combineReducers({AuthReducer,TaskReducer})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));