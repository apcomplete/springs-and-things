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
    if (this.props.status !== nextProps.status) {
      this.setState({ status: nextProps.status });
    };
  },

  componentWillUpdate(nextProps, nextState) {
    this.refs.vertex.position(nextProps);
    if (nextState.status !== this.state.status) {
      switch (nextState.status) {
        case SELECTED_STATE:
          this.panTo();
        case HOVERED_STATE:
          this.inflate();
          break;
        default:
          this.deflate();
      }
    }
  },

  panTo() {
    this.refs.vertex.getStage().to({
      x: document.body.clientWidth/2-this.props.x,
      y: document.body.clientHeight/2-this.props.y,
      duration: 0.5
    });
  },

  onClick() {
    this.props.handleClick();
  },

  onMouseEnter() {
    this.props.handleMouseEnter();
  },

  onMouseLeave() {
    this.props.handleMouseLeave();
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
