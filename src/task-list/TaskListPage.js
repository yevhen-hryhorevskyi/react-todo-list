import React, {PropTypes, Component} from "react";
import {Link} from "react-router";
import _ from "lodash";
import injectProps from "../_utils/decorators/injectProps";
import * as TaskStatusEnum from "../_enums/TaskStatus";
import * as TaskListPageFilterEnum from "../_enums/TaskListPageFilter";
import {NEW_TASK_URL, TASK_LIST_URL} from "../_constants/routeUrls";
import PageTitle from "../_components/PageTitle";
import {CardLayout} from "../_components/cards";
import TaskItem from "./TaskItem";

class TaskListPage extends Component {
    static propTypes = {
        idToTask: PropTypes.instanceOf(Map), // Map<Props.number, createTaskShape()> which contains <createdTimestamp, Task>
        filter: PropTypes.oneOf(Object.values(TaskListPageFilterEnum)),

        // Actions
        completeTask: PropTypes.func,
        deleteTask: PropTypes.func,

        navigateTo: PropTypes.func
    };

    shouldComponentUpdate(nextProps) {
        return nextProps.idToTask != this.props.idToTask || nextProps.filter != this.props.filter;
    }

    renderTaskList(idToTask, filter, completeTask, deleteTask) {
        const taskList = Array.from(idToTask.values());
        const renderedTaskList = _.chain(taskList)
            .filter((task) => {
                switch (filter) {
                    case TaskListPageFilterEnum.IN_PROGRESS:
                        return task.status == TaskStatusEnum.IN_PROGRESS;
                    case TaskListPageFilterEnum.COMPLETED:
                        return task.status == TaskStatusEnum.COMPLETED;
                    default:
                        return true;
                }
            })
            .orderBy(['createdDate'], ['desc'])
            .map((task) => {
                return <TaskItem key={task.id}
                                 task={task}
                                 completeTask={completeTask}
                                 deleteTask={deleteTask}/>
            })
            .value();

        if (!renderedTaskList.length) {
            const emptyMsg = this.renderEmptyMessage(filter);
            return emptyMsg;
        }

        return renderedTaskList;
    }

    renderEmptyMessage(filter) {
        switch (filter) {
            case TaskListPageFilterEnum.ALL:
                return <div className="task-list-page__empty-list-label">
                    Seems that you haven't created any task yet.<br/>
                    To create a new task you may <Link to={NEW_TASK_URL}>click here</Link> or use the create
                    button at the top.
                </div>;
            case TaskListPageFilterEnum.IN_PROGRESS:
                return <div className="task-list-page__empty-list-label">
                    Seems that you have completed all tasks.<br/>
                    Take a rest or <Link to={NEW_TASK_URL}>click here</Link> to create a new one.
                </div>;
            case TaskListPageFilterEnum.COMPLETED:
                return <div className="task-list-page__empty-list-label">
                    Seems that you haven't completed any task yet.<br/>
                    But don't give up!
                </div>;
        }
    }

    @injectProps
    render({idToTask, filter, completeTask, deleteTask, navigateTo}) {
        const renderedTaskList = this.renderTaskList(idToTask, filter, completeTask, deleteTask);

        return <div className="task-list-page">
            <PageTitle className="task-list-page__title">Todo List</PageTitle>
            <Link className="task-list-page__create-btn" to={NEW_TASK_URL}>Create New</Link>

            <div className="task-list-page__filter-container">
                <Link className={`task-list-page__filter ${filter == TaskListPageFilterEnum.ALL ? "active" : ""}`}
                      to={`${TASK_LIST_URL}/${TaskListPageFilterEnum.ALL}`}>
                    All
                </Link>
                <Link className={`task-list-page__filter ${filter == TaskListPageFilterEnum.IN_PROGRESS ? "active" : ""}`}
                      to={`${TASK_LIST_URL}/${TaskListPageFilterEnum.IN_PROGRESS}`}>
                    Active
                </Link>
                <Link className={`task-list-page__filter ${filter == TaskListPageFilterEnum.COMPLETED ? "active" : ""}`}
                      to={`${TASK_LIST_URL}/${TaskListPageFilterEnum.COMPLETED}`}>
                    Done
                </Link>
            </div>

            <CardLayout className="task-list">
                {renderedTaskList}
            </CardLayout>
        </div>
    }
}

export default TaskListPage;