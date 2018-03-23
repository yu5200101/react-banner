import React from 'react';
import {connect} from "react-redux";
import action from '../store/action/index';
import '../static/css/bannerFocus.less';

class BannerFocus extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {step, focusClick,len} = this.props;
        step--;
        switch (step) {
            case -1:
                step = len-1;
                break;
            case len :
                step = 0;
                break;
        }
        return <ul className="banner-focus">
            {
                new Array(len).fill('').map((item, index) => {
                    return <li key={index}
                               className={step === index ? 'active' : ''}
                               num={index}
                               onClick={(ev) => {
                                   focusClick(Number(ev.target.getAttribute('num'))+1);
                               }}
                    ></li>
                })
            }
        </ul>
    }

}

export default connect(state => ({...state.move}), action.move)(BannerFocus);
