import * as Types from '../action-types';

const Move = {
    autoMove(num, speed = '.3s') {
        return {type: Types.AUTO_MOVE, num, speed}
    },
    focusClick(num) {
        return {type: Types.FOCUS_CLICK, num};
    }
};

export default Move;