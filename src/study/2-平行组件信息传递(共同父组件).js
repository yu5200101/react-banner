import React from 'react';
import ReactDOM from 'react-dom';

class P extends React.Component {
    constructor() {
        super();
        this.state = {msg: '珠峰'};
    }

    fn = msg => this.setState({msg});

    render() {
        return <div>
            <A callback={this.fn}/>
            <B msg={this.state.msg}/>
        </div>;
    }
}

class A extends React.Component {
    componentDidMount() {
        setTimeout(() => {
            let {callback} = this.props;
            callback && callback('hello world');
        }, 2000);
    }

    render() {
        return <div>
            我是A
        </div>;
    }
}

class B extends React.Component {
    render() {
        return <div>
            {this.props.msg}
        </div>;
    }
}


ReactDOM.render(<div>
    <P/>
</div>, window.root);