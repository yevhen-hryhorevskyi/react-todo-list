import {PropTypes} from "react";
import * as TaskStatusEnum from "../_enums/TaskStatus";


export function createTaskShape() {
    return PropTypes.shape({
        id: PropTypes.number, // timestamp of createdDate
        createdDate: PropTypes.instanceOf(Date),
        completedDate: PropTypes.instanceOf(Date),
        value: PropTypes.string,
        status: PropTypes.oneOf(Object.keys(TaskStatusEnum))
    });
}