import React from 'react';
import { Group } from 'react-konva';
import Portrait from './portrait';

const Vertex = React.createClass({
  getInitialState() {
    return {
      status: 'normal'
    };
  },

  updateStatus(status) {
    if (this.state.status === status) return;
    this.setState({ status: status });
    switch (status) {
      case 'clicked':
      case 'hovered':
        this.inflate();
        break;
      default:
        this.deflate();
    }
  },

  onClick() {
    let newStatus = this.state.status === 'clicked' ? 'normal' : 'clicked';
    this.updateStatus(newStatus);
  },

  onMouseEnter() {
    if (this.state.status === 'normal') {
      this.updateStatus('hovered');
    }
  },

  onMouseLeave() {
    if (this.state.status === 'hovered') {
      this.updateStatus('normal');
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
