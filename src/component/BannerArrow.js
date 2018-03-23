import React from 'react';
import '../static/css/bannerArrow.less';
import {connect} from "react-redux";
import action from '../store/action/index';

class BannerArrow extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidUpdate() {
        this.isClick = false;
    }

    render() {
        return <div className="banner-arrow" onClick={this.handClick}>
            <a href="javascript:;" className="arrowLeft"></a>
            <a href="javascript:;" className="arrowRight"></a>
        </div>
    }

    handClick = (ev) => {
        let {autoMove} = this.props;
        if (this.isClick) return;
        this.isClick = true;
        let tarClass = ev.target.className;
        tarClass.includes('arrowLeft') ? autoMove(-1) : autoMove(1)
    }
}

export default connect(state => ({...state.move}), action.move)(BannerArrow);
