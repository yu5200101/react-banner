import React from "react";

export default class A extends React.Component {
    componentDidMount() {
        let {store} = this.props;

        localStorage.removeItem('pubMsg');
        setTimeout(() => {
            localStorage.setItem('pubMsg', 'HELLO');
            store.forEach(item => item());
        }, 2000);
    }

    render() {
        return <div>
            我是A
        </div>;
    }
}