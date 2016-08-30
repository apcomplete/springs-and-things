import React from 'react';
import { Group } from 'react-konva';
import Portrait from './portrait';
import { NORMAL_STATE, HOVERED_STATE, SELECTED_STATE } from '../../constants';

const Vertex = React.createClass({
  getInitialState() {
    return {
      status: NORMAL_STATE
    };
  },

  componentWillReceiveProps(nextProps) {
    if (this.props.status === nextProps.status) return;
    this.setState({ status: nextProps.status });
  },

  componentWillUpdate(nextProps, nextState) {
    switch (nextState.status) {
      case SELECTED_STATE:
      case HOVERED_STATE:
        this.inflate();
        break;
      default:
        this.deflate();
    }
  },

  reset() {
    this.setState({ status: NORMAL_STATE});
  },

  onClick() {
    this.props.handleClick();
  },

  onMouseEnter() {
    if (this.state.status === NORMAL_STATE) {
      this.setState({ status: HOVERED_STATE});
    }
  },

  onMouseLeave() {
    if (this.state.status === HOVERED_STATE) {
      this.setState({ status: NORMAL_STATE});
    }
  },

  inflate() {
    this.refs.vertex.to({
      scaleX: 1.2,
      scaleY: 1.2,
      duration: 0.2
    });
  },

  deflate() {
    this.refs.vertex.to({
      scaleX: 1,
      scaleY: 1,
      duration: 0.2
    });
  },

  render() {
    let width = 600;
    let height = 400;

    return (
      <Group
        ref="vertex"
        width={width}
        height={height}
        x={this.props.x}
        y={this.props.y}
        onClick={this.onClick}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
      >
        <Portrait />
      </Group>
    );
  }
});

export default Vertex;
