import _ from 'lodash';
import { 
  NORMAL_STATE,
  HOVERED_STATE,
  SELECTED_STATE 
} from '../constants';

const getHoverRepulsion = (state, action) => {
  let isAnySelected = _.some(state.vertices, { status: SELECTED_STATE });
  let repulsion = 60;
  if (isAnySelected) {
    repulsion = 300;
  }
  return repulsion;
}

const getLeaveRepulsion = (state, action) => {
  let isAnySelected = _.some(state.vertices, { status: SELECTED_STATE });
  let repulsion = 1;
  if (isAnySelected) {
    repulsion = 200;
  }
  return repulsion;
}

const repulsion = (state = {}, action) => {
  switch (action.type) {
    case 'CLICK_VERTEX':
      return 200;
    case 'LEAVE_VERTEX':
      return getLeaveRepulsion(state, action);
    case 'HOVER_VERTEX':
      return getHoverRepulsion(state, action);
    default:
      return state.repulsion;
  }
};

export default repulsion;
