import React, {PropTypes, Component} from "react";
import injectProps from "../_utils/decorators/injectProps";

class PageTitle extends Component {

    @injectProps
    render({className, ...restProps}) {
        return <div {...restProps} className={`page-title ${className || ""}`}>
            {this.props.children}
        </div>
    }
}

export default PageTitle;