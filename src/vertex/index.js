import React from 'react';
import { Group } from 'react-konva';
import Portrait from './portrait';

const Vertex = React.createClass({
  render() {
    let width = 600;
    let height = 400;

    return (
      <Group width={width} height={height} x={this.props.x} y={this.props.y}>
        <Portrait />
      </Group>
    );
  }
});

export default Vertex;
