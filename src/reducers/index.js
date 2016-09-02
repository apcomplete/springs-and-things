import _ from 'lodash';
import vertices from './vertices';
import repulsion from './repulsion';

const combineReducers = (state = { vertices: [], repulsion: 1 }, action) => {
  state.vertices = vertices(state.vertices, action);
  state.repulsion = repulsion(state, action);
  return _.extend({}, state);
};

export default combineReducers;
