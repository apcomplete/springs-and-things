import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { Stage } from 'react-konva';

import Graph from './components/graph';
import vertices from './points';
import reducers from './reducers';
import './App.css';

const store = createStore(reducers, {
  vertices: vertices,
  repulsion: 1,
  springConstant: 1
});

export default React.createClass({
  render() {
    return (
      <Provider store={store}>
        <Stage ref="stage" width="2100" height="1500">
          <Graph />
        </Stage>
      </Provider>
    );
  }
});
