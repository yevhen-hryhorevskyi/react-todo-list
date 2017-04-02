import React, {PropTypes, Component} from "react";
import {connect} from "react-redux";
import injectProps from "../_utils/decorators/injectProps";
import {addTask} from "../reducers-and-actions/taskInfoActions";
import NewTaskPage from "./NewTaskPage";

const mapActionsToDispatcher = {
    addTask
};

@connect(null, mapActionsToDispatcher)
class NewTaskContainer extends Component {

    static contextTypes = {
        router: PropTypes.object
    };

    goBack() {
        this.context.router.goBack();
    }

    @injectProps
    render(props) {

        return <div>
            <NewTaskPage {...props}
                         goBack={::this.goBack}
            />
        </div>
    }
}


export default NewTaskContainer;
