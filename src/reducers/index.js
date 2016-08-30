import _ from 'lodash';
import { NORMAL_STATE, SELECTED_STATE } from '../constants';

const updateStatus = (state, status) => {
  return _.extend(state, { status: status });
}

const toggleVertex = (state, action) => {
  let status = SELECTED_STATE;
  if (state.id !== action.id || state.status === SELECTED_STATE) {
    status = NORMAL_STATE;
  }
  return updateStatus(state, status);
}

const vertex = (state = {}, action) => {
  switch (action.type) {
    case 'TOGGLE_VERTEX':
      return toggleVertex(state, action);
    default:
      return state;
  }
}

const vertices = (state = {}, action) => {
  switch (action.type) {
    case 'TOGGLE_VERTEX':
      return state.map(v => vertex(v, action));
    default:
      return state;
  }
};

export default vertices;
