import React from 'react';
import ReactDOM from 'react-dom';
import './css/bootstrap.css';

class Panel extends React.Component {
    constructor() {
        super();
        this.state = {num: 0};
    }

    fn = n => {
        this.setState({
            num: n
        });
    };

    render() {
        let {title, con} = this.props;
        return <div className="panel panel-default">
            <Header title={title} callback={this.fn}></Header>
            <p>计数器的结果是：{this.state.num}</p>
        </div>;
    }
}

class Header extends React.Component {
    componentDidMount() {
        let {callback} = this.props;
        let n = 0;
        setInterval(() => {
            n++;
            callback(n);
        }, 1000);
    }

    render() {
        let {title} = this.props;
        return <header className="panel-heading">
            <h2 className="panel-title">
                {title}
            </h2>
        </header>;
    }
}

class Body extends React.Component {
    render() {
        return <main className="panel-body">

        </main>;
    }
}

ReactDOM.render(<div>
    <Panel title="警告" con="郑重警告：离你们毕业不远了"/>
</div>, window.root);