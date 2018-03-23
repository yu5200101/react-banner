import React from 'react';
import BannerFocus from './BannerFocus'
import BannerArrow from './BannerArrow'
import {connect} from "react-redux";
import action from '../store/action/index';
import IMG_DATA from '../static/imgData';
import '../static/css/banner.less'

class Banner extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        IMG_DATA.unshift(IMG_DATA[IMG_DATA.length - 1]);
        IMG_DATA.push(IMG_DATA[1]);
        this.IMG_DATA = IMG_DATA;
    }

    componentDidMount() {
        this.move();
    }

    componentDidUpdate(prevProps, prevState) {
        let {autoMove, step, speed} = this.props;
        // console.log(prevProps.step, prevProps.speed);
        console.log(step, speed);
        let len = IMG_DATA.length;
        if (step >= len) {
            autoMove(-len + 1, '0s');
            setTimeout(() => {
                autoMove(1, '.3s');
            }, 0);
        }
        if (step <= -1) {
            autoMove(len - 1, '0s');
            setTimeout(() => {
                autoMove(-1, '.3s')
            }, 0);
        }
    }

    move = () => {
        let {autoMove, interval, step, speed} = this.props;
        this.autoTimer = setInterval(() => {
            autoMove(1, speed);
        }, interval);
    };

    render() {
        let {step, speed, interval} = this.props;
        let len = IMG_DATA.length;
        //=>动态计算wrapper的样式
        const wrapperStyle = {
            width: `${IMG_DATA.length * 1000}px`,
            left: `${-step * 1000}px`,
            //=>设置过渡效果：当wrapper的left值改变的时候，可以按照过渡动画完成
            transition: speed
        };
        return <div className="container"
                    onMouseEnter={
                        ev => {
                            clearInterval(this.autoTimer);
                        }
                    }
                    onMouseLeave={
                        ev => {
                            this.move();
                        }
                    }
        >
            {/*wrapper：轮播图部分*/}
            <div className="wrapper" style={wrapperStyle}>
                {
                    this.IMG_DATA.map(({img, title}, index) => {
                        return <div className="slide" key={index}>
                            <img src={img} alt={title}/>
                        </div>;
                    })
                }

            </div>
            {/*focus焦点*/}
            <BannerFocus count={len}/>
            {/*arrow箭头*/}
            <BannerArrow/>
        </div>
    }
}

export default connect(state => ({...state.move}), action.move)(Banner);