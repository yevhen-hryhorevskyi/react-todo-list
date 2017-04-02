import React, {Component, PropTypes} from "react";

class CardItem extends Component {

    static propTypes = {
        growth: PropTypes.number,
        innerClassName: PropTypes.string
    };

    static defaultProps = {
        growth: 1
    };

    render() {
        const {growth, className, innerClassName, ...restProps} = this.props;
        const mergedClassName = `card-item card-item__adaptive item-${growth}-growth ${className || ""}`;
        const mergedInnerClassName = `card-item__content ${innerClassName || ""}`;

        return <div {...restProps} className={mergedClassName}>
            <div className={mergedInnerClassName}>
                {this.props.children}
            </div>
        </div>
    }
}

export default CardItem;