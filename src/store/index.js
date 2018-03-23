import reducer from './reducer/index';
import {createStore} from 'redux';

let store = createStore(reducer);

export default store;
