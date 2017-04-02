import React, {PropTypes, Component} from "react";
import elementResizeEvent from "element-resize-event";
import SequenceUtil from "../../_utils/SequenceUtil";

const DEFAULT_GRID_ITEM_MIN_WIDTH = 310; // px
const UNLIMITED_ITEMS_PER_ROW_COUNT = -1;

class CardLayout extends Component {

    static propTypes = {
        cardItemMinWidth: PropTypes.number, //px
        maxPerRowCount: PropTypes.number,
        cardResizeCallback: PropTypes.func // params: width, height
    };

    static defaultProps = {
        cardItemMinWidth: DEFAULT_GRID_ITEM_MIN_WIDTH, //px
        maxPerRowCount: UNLIMITED_ITEMS_PER_ROW_COUNT,
        cardResizeCallback: () => {}
    };

    constructor(props) {
        super(props);
        this.refName = `uuid_${SequenceUtil.getNext()}`;
        this.state = {
            childrenSizeClassName: null
        }
    }

    componentDidMount() {
        const domeNode = this._getDomNode();
        const childrenSizeClassName = this._defineChildrenSizeClassName(domeNode.clientWidth, this.props.cardItemMinWidth, this.props.maxPerRowCount);
        
        this.setState({childrenSizeClassName});
        
        elementResizeEvent(domeNode, () => this._onResize(domeNode.clientWidth, domeNode.clientHeight));
    }

    componentDidUpdate() {
        const domeNode = this._getDomNode();
        if (domeNode.getElementsByClassName('resize-sensor').length === 0) {
            elementResizeEvent(domeNode, () => this._onResize(domeNode.clientWidth, domeNode.clientHeight));
        }
    }

    _onResize(width, height) {
        const childrenSizeClassName = this._defineChildrenSizeClassName(width, this.props.cardItemMinWidth, this.props.maxPerRowCount);
        
        if (this.state.childrenSizeClassName != childrenSizeClassName) {
            this.setState({childrenSizeClassName});
        }

        this.props.cardResizeCallback(width, height);
    }

    _getDomNode() {
        return this.refs[this.refName];
    }

    _defineChildrenSizeClassName(width, cardItemMinWidth = DEFAULT_GRID_ITEM_MIN_WIDTH, maxItemsPerRowCount = UNLIMITED_ITEMS_PER_ROW_COUNT) {
        let itemsPerRowCount = ~~(width / cardItemMinWidth);
        if (maxItemsPerRowCount > 0 && maxItemsPerRowCount < itemsPerRowCount) {
            itemsPerRowCount = maxItemsPerRowCount;
        }
        return `card-layout__${itemsPerRowCount}-elements-per-row`;
    }

    render() {
        const {cardItemMinWidth, maxPerRowCount, cardResizeCallback, className, ...restProps} = this.props;
        const mergedClassName = `card-layout ${this.state.childrenSizeClassName || ""} ${className || ""}`;

        return <div {...restProps} ref={this.refName} className={mergedClassName}>
            {this.props.children}
        </div>;
    }
}

export default CardLayout;