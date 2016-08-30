import React from 'react';
import { Rect, Layer } from 'react-konva';
import Vertex from './vertex';

const Graph = React.createClass({
  getInitialState() {
    return { vertices: this.generateVertices() };
  },

  onVertexClick(idx) {
    let vertex = this.state.vertices[idx];
    this.panTo(vertex);
    this.state.vertices.map((v, i) => {
      if (i !== idx) {
        this.getVertexReference(i).reset();
      }
    });
  },

  panTo(vertex) {
    this.refs.graph.getStage().to({
      x: document.body.clientWidth/2-vertex.props.x-600/2,
      y: document.body.clientHeight/2-vertex.props.y-400/2,
      duration: 0.5
    });
  },

  getVertexReference(index) {
    return this.refs['vertex' + index];
  },

  generateVertices() {
    return this.props.outlets.map((vertex, idx) => {
      return (
        <Vertex
          x={vertex.x}
          y={vertex.y}
          key={idx}
          ref={ 'vertex' + idx }
          handleClick={this.onVertexClick.bind(this, idx)}
        />
      );
    });
  },

  render() {
    return (
      <Layer ref="graph" draggable="true">
        <Rect width="2000" height="2000" fill="#000" opacity="0"/>
        {this.state.vertices}
      </Layer>
    );
  }
});

export default Graph;
