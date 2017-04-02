import {ADD_TASK, COMPLETE_TASK, DELETE_TASK} from "../_constants/actions";

export function addTask(taskValue) {
    return {
        type: ADD_TASK,
        payload: taskValue
    }
}

export function completeTask(task) {
    return {
        type: COMPLETE_TASK,
        payload: task
    }
}

export function deleteTask(task) {
    return {
        type: DELETE_TASK,
        payload: task
    }
}