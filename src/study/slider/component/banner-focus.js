import React from 'react';
import '../css/banner-focus.less';
import PropTypes from 'prop-types';

export default class BannerFocus extends React.Component {
    static defaultProps = {
        cur: 0
    };
    static propTypes = {
        num: PropTypes.number.isRequired,
        cur: PropTypes.number,
        callback: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
    }

    render() {
        let {num, cur: step} = this.props;
        //=>处理左右边界的step的值，让其和focus的索引正对应
        step--;
        switch (step) {
            case -1:
                step = num - 1;
                break;
            case num:
                step = 0;
                break;
        }
        return <ul className="banner-focus">
            {
                new Array(num).fill('').map((item, index) => {
                    return <li key={index} className={step === index ? 'active' : ''} onClick={this.handClick}
                               num={index}></li>
                })
            }
        </ul>
    }

    handClick = (ev) => {
        let {callback} = this.props;
        // console.log(ev.target.getAttribute('num'));
        callback(Number(ev.target.getAttribute('num')) + 1);
    }
}