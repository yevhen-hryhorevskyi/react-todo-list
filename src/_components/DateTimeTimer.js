import React, {PropTypes, Component} from "react";
import injectProps from "../_utils/decorators/injectProps";

class DateTimeTimer extends Component {

    constructor(props) {
        super(props);
        this.state = {value: new Date()};

        this.intervalId = setInterval(::this.updateStateWithCurrentDate, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    updateStateWithCurrentDate() {
        this.setState({value: new Date()});
    }

    @injectProps
    render({className, ...restProps}) {
        return <div {...restProps} className={`date-time-timer ${className || ""}`}>
            {this.state.value.toLocaleString()}
        </div>
    }
}

export default DateTimeTimer;