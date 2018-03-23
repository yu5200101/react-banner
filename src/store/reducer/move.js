import * as Types from '../action-types';
import IMG_DATA from '../../static/imgData';

function move(state = {
    step: 1,
    speed: '.3s',
    interval: 1000,
    len: IMG_DATA.length
}, action) {
    state = {...state};
    switch (action.type) {
        case Types.AUTO_MOVE:
            return {...state, step: state.step + action.num, speed: action.speed};
        case Types.FOCUS_CLICK:
            return {...state, step: action.num};
    }
    return state;
}

export default move;