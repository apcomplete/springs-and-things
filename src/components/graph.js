import React from 'react';
import { Rect, Layer } from 'react-konva';
import { Animation } from 'konva';
import { connect } from 'react-redux';

import Vector, { calculatePosition, euclideanDistance } from '../util/vector.model';
import Vertex from './vertex';
import { clickVertex, hoverVertex, leaveVertex, moveVertex } from '../actions';

const TIME_STEP = 0.2

const Graph = React.createClass({
  getInitialState() {
    return { edges: this.generateEdges() };
  },

  componentDidMount() {
    let anim = new Animation(frame => {
      this.applyCoulombsLaw()
      this.applyHookesLaw()
      this.props.vertices.forEach(v => {
        let newPosition = calculatePosition(v, TIME_STEP);
        this.props.updatePosition(v, newPosition);
      });
    }, this.refs.graph);

    anim.start();
  },

  generateEdges() {
    let edges = [];
    this.props.vertices.forEach(v => {
      this.props.vertices.forEach(u => {
        if (v !== u) {
          edges.push({
            src: u,
            dest: v,
            length: euclideanDistance(u, v).magnitude()
          });
        }
      });
    });
    return edges;
  },

  /*
  Coulomb's Law: F = k*|q1*q2|/r^2
  In our case k*|q1*q2| is replaced with the constant REPULSION, since all
  particles have the same charge.
  */
  applyCoulombsLaw() {
    this.props.vertices.forEach(v => {
      this.props.vertices.forEach(u => {
        if (v !== u) {
          let vPosition = { x: v.x, y: v.y };
          let uPosition = { x: u.x, y: u.y };
          let distanceVector = euclideanDistance(vPosition, uPosition);
          let distance = distanceVector.magnitude() + 0.1;
          let direction = distanceVector.normalize();

          //In accordance with Newton's 3rd Law of Motion, F2 = -F1, force must be applied to both particles
          let force = direction.multiply(this.props.repulsion).divide(distance * distance * 5*Math.pow(10,-7));
          this.applyForce(v, force);
          this.applyForce(u, force.multiply(-1));
        }
      });
    });
  },

  /*
  Hooke's Law: F = kX where X is displacement of the spring from it's original length.
  */
  applyHookesLaw() {
    this.state.edges.forEach(edge => {
      let u = edge.src;
      let v = edge.dest;
      let length = edge.length;

      let d = euclideanDistance(u, v);
      let displacement = length - d.magnitude();
      let direction = d.normalize();
      //Same as above, Newton's 3rd Law of Motion, F2 = -F1
      let force = direction.multiply(this.props.springConstant * displacement);
      this.applyForce(u, force);
      this.applyForce(v, force.multiply(-1));
    });
  },

  applyForce(vertex, force) {
    vertex.acceleration = vertex.acceleration.add(force);
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
          handleClick={this.props.clickVertex.bind(this, vertex)}
          handleMouseEnter={this.props.hoverVertex.bind(this, vertex)}
          handleMouseLeave={this.props.leaveVertex.bind(this, vertex)}
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
  return state;
}

const mapDispatchToProps = (dispatch) => {
  return {
    clickVertex: (vertex) => {
      dispatch(clickVertex(vertex));
    },
    hoverVertex: (vertex) => {
      dispatch(hoverVertex(vertex));
    },
    leaveVertex: (vertex) => {
      dispatch(leaveVertex(vertex));
    },
    updatePosition: (vertex, position) => {
      dispatch(moveVertex(vertex, position));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Graph);
