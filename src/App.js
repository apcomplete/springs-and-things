import React from 'react';
import { Stage } from 'react-konva';
import Graph from './graph';
import outlets from './points';
import './App.css';

export default React.createClass({
  render() {
    return (
      <Stage ref="stage" width="2100" height="1500">
        <Graph outlets={outlets} />
      </Stage>
    );
  }
});
