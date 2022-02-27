import { ActionTypes } from '../actions';

// eslint-disable-next-line default-param-last
const TreesReducer = (state = 0, action) => {
  switch (action.type) {
    case ActionTypes.INCREMENT:
      return state + 1;
    case ActionTypes.DECREMENT:
      return state - 1;
    default:
      return state;
  }
};

export default TreesReducer;
