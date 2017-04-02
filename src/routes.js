import React from "react";
import {Route, IndexRedirect} from "react-router";
import NewTaskContainer from "./new-task/NewTaskContainer";
import TaskListContainer from "./task-list/TaskListContainer";


export default <Route path="/">

    <IndexRedirect to="/tasks"/>

    <Route path="tasks/new" component={NewTaskContainer}/>
    <Route path="tasks" component={TaskListContainer}>
        <Route path=":filter" component={TaskListContainer}/>
    </Route>

    <Route path="*">
        <IndexRedirect to="/tasks"/>
    </Route>
</Route>
