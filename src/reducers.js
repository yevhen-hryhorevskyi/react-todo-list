import {combineReducers} from "redux";
import taskInfoReducer from "./reducers-and-actions/taskInfoReducer";

const rootReducer = combineReducers({
    taskInfoReducer
});

export default rootReducer;
