import React from "react";

export default class B extends React.Component {
    constructor() {
        super();
        this.state = {msg: ''};
    }

    componentDidMount() {
        let {store} = this.props;
        store.push(() => {
            //=>获取本地最新的pubMsg，赋值给组件的STATE状态
            this.setState({msg: localStorage.getItem('pubMsg')});
        });
    }

    render() {
        return <div>
            我是B
            <span style={{color: 'red'}}>{this.state.msg}</span>
        </div>;
    }
}