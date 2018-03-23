import React from 'react';
import BannerFocus from './banner-focus'
import BannerArrow from './banner-arrow'
import PropTypes from 'prop-types';
import '../css/banner.less'

export default class Banner extends React.Component {
    static defaultProps = {
        interval: 3000
    };
    static propTypes = {
        IMG_DATA: PropTypes.array.isRequired,
        interval: PropTypes.number
    };

    constructor(props) {
        super(props);
        this.state = {
            step: 1,//=>step记录当前运动的步长（当前需要展示轮播区域的索引）,
            speed: '.3s'//=>控制slide切换的速度（立即回到某一张的时候需要把这个速度设置为0）
        }
    }

    componentWillMount() {
        let {IMG_DATA} = this.props;
        //=>为了实现无缝衔接，我们把IMG_DATA进行修改，
        //=>修改的步骤：
        /*
        * 1、把真实的第一张克隆一份放在末尾
        * 2、把真实的最后一张克隆一份放在开头
        ----
        注意点：
        1、我们这一步操作应该处在第一次加载之前（执行一次即可，不能放在render中，这样的话每一次重新渲染都会新加很多数据）
        2、放在这里处理，想在render中获取最新的数据，我们可以把最新的数据挂载到state上，或者挂载到实例上也可以，但是不能修改props的值
        */
        IMG_DATA.unshift(IMG_DATA[IMG_DATA.length - 1]);
        IMG_DATA.push(IMG_DATA[1]);
        this.IMG_DATA = IMG_DATA;
    }

    componentDidMount() {
        //=>第一次渲染完成后，
        /*
        1、设置定时器开启自动轮播(不是直接操作wrapper,而是通过修改step数据，控制组件重新渲染，从而实现wrapper的运动)

        */
        this.autoMove();
    }

    shouldComponentUpdate(nextProps, nextState) {
        //=>这里面通过this.state获取的state信息还是修改之前的，想要获取最新的，我们基于传递的形参获取（shouldComponentUpdate也是同样的情况）
        let {step} = nextState,
            len = this.IMG_DATA.length;

        //=>右边界处理
        if (step >= len) {
            //=>情况：3000ms后step再次累加，累加的结果已经超过克隆后的边界
            //=>处理：阻止重新渲染/设置step变为1（让其立即运动到真实的第一张）/当立即运动完成后我们设置step的状态为2，让其300ms（过渡动画的速度）运动到真实的第二张
            this.setState({
                step: 1,
                speed: '0s'
            }, () => {
                //setState是异步操作，回调函数代表状态改变后此时我们应该等到立即回到第一张后，让其运动到第二张(此时应该有过渡效果了)
                setTimeout(() => {
                    this.setState({
                        step: 2,
                        speed: '.3s'
                    })
                }, 0);//只是想把操作设置为异步操作而已

            });
            return false;
        }

        //=>左边界处理
        if (step <= -1) {
            this.setState({
                step: len - 2,
                speed: '0s'
            }, () => {
                //setState是异步操作，回调函数代表状态改变后此时我们应该等到立即回到第一张后，让其运动到第二张(此时应该有过渡效果了)
                setTimeout(() => {
                    this.setState({
                        step: len - 3,
                        speed: '.3s'
                    })
                }, 0);//只是想把操作设置为异步操作而已

            });
            return false;
        }
        return true;
    }

    render() {
        let IMG_DATA = this.IMG_DATA,
            {interval} = this.props,
            {step, speed} = this.state;
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
                            this.autoMove();
                        }
                    }
        >
            {/*wrapper：轮播图部分*/}
            <div className="wrapper" style={wrapperStyle}>
                {
                    IMG_DATA.map(({img, title}, index) => {
                        return <div className="slide" key={index}>
                            <img src={img} alt={title}/>
                        </div>;
                    })
                }

            </div>
            {/*focus焦点*/}
            <BannerFocus num={IMG_DATA.length - 2} cur={step} callback={this.handFocus}/>
            {/*arrow箭头*/}
            <BannerArrow callback={this.handArrow} step={step}/>
        </div>
    }

    //=>设置自动轮播图
    autoMove = () => {
        //把自动轮播定时器的返回值挂载到实例上
        this.autoTimer = setInterval(() => {
            let step = this.state.step;
            step++;
            // if (step >= this.props.IMG_DATA.length) step = 0;
            this.setState({step});
        }, this.props.interval);
    };
    //=>左右切换（传递给子组件的方法）
    handArrow = (newStep) => {
        this.setState({step: newStep})
    };

    handFocus = (newStep) => {
        this.setState({step: newStep});
    }
}