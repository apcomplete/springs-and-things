import React from 'react';
import { Group, Circle } from 'react-konva';

let width = 170;
let height = 170;

const Portrait = React.createClass({
  render() {
    let offset = {
      x: -1 * width/2,
      y: -1 * height/2,
    };
    let bgRadius = width/2+8;

    return (
      <Group x="0" y="0">
        <Circle radius={bgRadius} x="0" y="0" offset={offset} stroke="white" strokeWidth="2" />
        <Circle fill="#ccc" radius={bgRadius-8} x="0" y="0" offset={offset} stroke="white" strokeWidth="2" />
      </Group>
    );
  }
});

export default Portrait;
