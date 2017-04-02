import React, {PropTypes, Component} from "react";
import injectState from "../_utils/decorators/injectState";
import StringUtils from "../_utils/StringUtils";
import DateTimeTimer from "../_components/DateTimeTimer";
import PageTitle from "../_components/PageTitle";


const VALIDATION_EMPTY_VALUE = "Please enter the task value.";

class NewTaskPage extends Component {
    static propTypes = {
        // Actions
        addTask: PropTypes.func,

        goBack: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.state = {
            taskValue: "",
            validationError: null
        };
    }

    @injectState
    render({taskValue, validationError}) {

        const validationErrorClassName = `new-task-page__task-value__error ${validationError ? "" : "hidden"}`;

        return <div className="new-task-page">
            <PageTitle>Todo List</PageTitle>

            <div className="new-task-page__current-date">
                <span className="new-task-page__current-date__label">Date:</span>
                <DateTimeTimer className="new-task-page__current-date__date-time-timer"/>
            </div>
            <div className="new-task-page__value-label">What need to be done?</div>
            <textarea rows="4"
                      value={taskValue}
                      onChange={::this.onTaskValueChanged}
                      className="new-task-page__task-value"
                      maxLength="1000">
           </textarea>
            <div className={validationErrorClassName}>
                {validationError}
            </div>

            <div className="new-task-page__button-section">
                <button onClick={::this.onAddClicked} disabled={validationError}>Create</button>
                <button className="blue" onClick={::this.onCancelClicked}>Cancel</button>
            </div>
        </div>
    }

    onTaskValueChanged(e) {
        const taskValue = e.target.value;
        const validationError = this._getValidationError(taskValue);
        this.setState({taskValue, validationError});
    }

    onAddClicked() {
        const taskValue = this.state.taskValue;
        const validationError = this._getValidationError(taskValue);

        if (validationError) {
            this.setState({validationError});
        } else {
            this.props.addTask(taskValue);
            this.props.goBack();
        }
    }

    onCancelClicked() {
        this.props.goBack();
    }

    _getValidationError(taskValue) {
        if (!StringUtils.trimToEmpty(taskValue)) {
            return VALIDATION_EMPTY_VALUE;
        } else {
            return null;
        }
    }

}

export default NewTaskPage;