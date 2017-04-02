import React, {PropTypes, Component} from "react";
import {connect} from "react-redux";
import injectProps from "../_utils/decorators/injectProps";
import * as TaskListPageFilterEnum from "../_enums/TaskListPageFilter";
import {completeTask, deleteTask} from "../reducers-and-actions/taskInfoActions";
import TaskListPage from "./TaskListPage";

const FILTERS = Object.values(TaskListPageFilterEnum);

const mapStateToProps = (store) => {
    return {...store.taskInfoReducer};
};

const mapActionsToDispatcher = {
    completeTask,
    deleteTask
};

@connect(mapStateToProps, mapActionsToDispatcher)
class TaskListContainer extends Component {

    static contextTypes = {
        router: PropTypes.object
    };

    navigateTo(url) {
        this.context.router.push(url);
    }

    _getFilterValue(params) {
        const pathFilter = params.filter;
        if (FILTERS.indexOf(pathFilter) != -1) {
            return pathFilter;
        } else {
            return TaskListPageFilterEnum.ALL;
        }
    }

    @injectProps
    render({params, ...restProps}) {
        const filter = this._getFilterValue(params);

        return <div>
            <TaskListPage {...restProps}
                          filter={filter}
                          navigateTo={::this.navigateTo}
            />
        </div>
    }
}

export default TaskListContainer;
