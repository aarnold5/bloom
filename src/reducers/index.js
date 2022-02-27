// the starting point for your redux store
// this defines what your store state will look like
import { combineReducers } from 'redux';
import TreesReducer from './trees-reducer';
import PlaylistReducer from './playlist-reducer';

const rootReducer = combineReducers({
  trees: TreesReducer,
  playlist: PlaylistReducer,

});

export default rootReducer;
