import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from "redux";
import {Provider,connect} from "react-redux";
import Banner from './component/Banner';
import store from './store/index';
/*这里导入的样式一般都是公共样式*/
import './static/css/reset.min.css'

ReactDOM.render(<Provider store={store}>
    <Banner/>
</Provider>, window.root);
