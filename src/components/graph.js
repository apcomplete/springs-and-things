import React from 'react';
import { Rect, Layer } from 'react-konva';
import { connect } from 'react-redux';

import Vertex from './vertex';
import { toggleVertex } from '../actions';

const Graph = React.createClass({
  onVertexClick(idx) {
    let vertex = this.state.vertices[idx];
    this.panTo(vertex);
  },

  panTo(vertex) {
    this.refs.graph.getStage().to({
      x: document.body.clientWidth/2-vertex.props.x-600/2,
      y: document.body.clientHeight/2-vertex.props.y-400/2,
      duration: 0.5
    });
  },

  render() {
    let vertices = this.props.vertices.map((vertex, idx) => {
      return (
        <Vertex
          x={vertex.x}
          y={vertex.y}
          status={vertex.status}
          key={vertex.id}
          acceleration={new Vector()}
          handleClick={this.props.onVertexClick.bind(this, vertex)}
        />
      );
    });

    return (
      <Layer ref="graph" draggable="true">
        <Rect width="2000" height="2000" fill="#000" opacity="0"/>
        {vertices}
      </Layer>
    );
  }
});

const mapStateToProps = (state) => {
  return { vertices: state };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onVertexClick: (vertex) => {
      dispatch(toggleVertex(vertex));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Graph);
