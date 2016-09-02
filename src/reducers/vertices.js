import _ from 'lodash';
import { 
  NORMAL_STATE,
  HOVERED_STATE,
  SELECTED_STATE 
} from '../constants';

import Vector from '../util/vector.model';

const updateStatus = (vertex, status) => {
  return _.extend(vertex, { status: status });
}

const updatePosition = (vertex, action) => {
  if (vertex.id !== action.id) return vertex;
  vertex.acceleration = new Vector();
  return _.extend(vertex, action.position);
}

const toggleVertex = (vertex, action) => {
  let status = SELECTED_STATE;
  if (vertex.status === SELECTED_STATE) {
    status = NORMAL_STATE;
  }
  return updateStatus(vertex, status);
}

const leaveVertex = (vertex, action) => {
  if (vertex.status === SELECTED_STATE) return vertex;
  return updateStatus(vertex, NORMAL_STATE);
}

const hoverVertex = (vertex, action) => {
  if (vertex.status === SELECTED_STATE || vertex.id !== action.id) {
    return vertex;
  }
  return updateStatus(vertex, HOVERED_STATE);
}

const setStatus = (vertex, action) => {
  switch (action.type) {
    case 'MOVE_VERTEX':
      return updatePosition(vertex, action);
    case 'LEAVE_VERTEX':
      return leaveVertex(vertex, action);
    case 'HOVER_VERTEX':
      return hoverVertex(vertex, action);
    case 'CLICK_VERTEX':
      if (vertex.id !== action.id) {
        return updateStatus(vertex, NORMAL_STATE);
      }
      return toggleVertex(vertex, action);
    default:
      return vertex;
  }
}

const vertices = (state = [], action) => {
  return state.map(v => {
    return setStatus(v, action);
  });
}

export default vertices;
