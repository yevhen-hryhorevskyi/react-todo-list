import React, {PropTypes, Component} from "react";
import injectProps from "../_utils/decorators/injectProps";
import * as TaskStatusEnum from "../_enums/TaskStatus";
import {CardItem} from "../_components/cards";
import {createTaskShape} from "../_shapes";

class TaskItem extends Component {
    static propTypes = {
        task: createTaskShape(),

        // Actions
        completeTask: PropTypes.func,
        deleteTask: PropTypes.func,
    };

    shouldComponentUpdate(nextProps) {
        return nextProps.task != this.props.task;
    }

    renderTaskFooter(task) {
        if (task.status == TaskStatusEnum.IN_PROGRESS) {
            return <div className="task-item__footer task-item__footer__active">
                <button onClick={::this.onDoneBtnClicked}>Done!</button>
            </div>
        } else {
            return <div className="task-item__footer task-item__footer__completed">
                Done: {task.completedDate.toLocaleString()}
            </div>
        }
    }

    @injectProps
    render({task}) {

        const taskFooter = this.renderTaskFooter(task);

        return <CardItem>
            <div className={`task-item ${task.status == TaskStatusEnum.COMPLETED ? "completed" : ""}`}>
                <div className="delete-icon" onClick={::this.onDeleteBtnClicked}></div>
                <div className="task-item__created-row">
                    Created: {task.createdDate.toLocaleString()}
                </div>
                <div className={`task-item__value ${task.status == TaskStatusEnum.COMPLETED ? "completed" : ""}`}>{task.value}</div>

                {taskFooter}
            </div>
        </CardItem>
    }

    onDoneBtnClicked() {
        this.props.completeTask(this.props.task);
    }

    onDeleteBtnClicked() {
        this.props.deleteTask(this.props.task);
    }
}

export default TaskItem;