export const clickVertex = (vertex) => {
  return { type: 'CLICK_VERTEX', id: vertex.id };
}

export const hoverVertex = (vertex) => {
  return { type: 'HOVER_VERTEX', id: vertex.id };
}

export const leaveVertex = (vertex) => {
  return { type: 'LEAVE_VERTEX', id: vertex.id };
}

export const moveVertex = (vertex, position) => {
  return { type: 'MOVE_VERTEX', id: vertex.id, position };
}
