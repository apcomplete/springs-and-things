import React from 'react';
import { Rect, Layer } from 'react-konva';
import Vertex from './vertex';

const Graph = React.createClass({
  render() {
    let vertices = this.props.outlets.map((vertex, idx) => {
      return (
        <Vertex x={vertex.x} y={vertex.y} key={idx} />
      );
    });

    return (
      <Layer draggable="true">
        <Rect width="2000" height="2000" fill="#000" opacity="0"/>
        {vertices}
      </Layer>
    );
  }
});

export default Graph;
