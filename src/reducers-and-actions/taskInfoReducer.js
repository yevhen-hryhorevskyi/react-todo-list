import {PropTypes} from "react";
import {ADD_TASK, COMPLETE_TASK, DELETE_TASK} from "../_constants/actions";
import * as TaskStatusEnum from "../_enums/TaskStatus";
import LocalStorageService from "../_services/LocalStorageService";

// Make more declarative reducer's state using just react props for that...
const REDUCER_SCHEMA = {
    idToTask: PropTypes.instanceOf(Map) // Map<Props.number, createTaskShape()> which contains <createdTimestamp, Task>
};

const INITIAL_STATE = {
    idToTask: new Map(LocalStorageService.taskList.map((task) => [task.id, task]))
};

const reducerMap = {
    [ADD_TASK]: (state, taskValue) => {
        const currentDate = new Date();
        const newTask = {
            id: currentDate.getTime(),
            createdDate: currentDate,
            finishedDate: null,
            value: taskValue,
            status: TaskStatusEnum.IN_PROGRESS
        };

        const idToTask = new Map(state.idToTask);
        idToTask.set(newTask.id, newTask);

        updateLocalStorage(idToTask);

        return {idToTask};
    },
    [COMPLETE_TASK]: (state, task) => {
        if (!state.idToTask.has(task.id)) {
            return state;
        }

        const completedTask = {...task, status: TaskStatusEnum.COMPLETED, completedDate: new Date()};

        const idToTask = new Map(state.idToTask);
        idToTask.set(completedTask.id, completedTask);

        updateLocalStorage(idToTask);

        return {idToTask};
    },
    [DELETE_TASK]: (state, task) => {
        const idToTask = new Map(state.idToTask);

        if (idToTask.delete(task.id)) {
            updateLocalStorage(idToTask);

            return {idToTask};
        } else {
            return state;
        }
    }
};

function updateLocalStorage(idToTask) {
    LocalStorageService.taskList = Array.from(idToTask.values());
}

export default (state = INITIAL_STATE, action) => {
    let stateUpdates = state;

    const reducer = reducerMap[action.type];
    if (reducer) {
        stateUpdates = reducer(state, action.payload);
    }

    return stateUpdates == state ? state : {...state, ...stateUpdates};
}