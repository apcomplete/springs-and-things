import _ from 'lodash';

export default function Vector(opts) {
  this.x = _.get(opts, 'x', 0);
  this.y = _.get(opts, 'y', 0);
}

Vector.prototype.magnitude = function() {
  return Math.sqrt(Math.pow(this.x,2) + Math.pow(this.y,2));
}

Vector.prototype.add = function(v) {
  return new Vector({
    x: this.x + v.x,
    y: this.y + v.y
  });
}

Vector.prototype.subtract = function(v) {
  return new Vector({
    x: this.x - v.x,
    y: this.y - v.y,
  });
}

Vector.prototype.divide = function(n) {
  return new Vector({
    x: n === 0 ? 0 : this.x/n,
    y: n === 0 ? 0 : this.y/n
  });
}

Vector.prototype.multiply = function(n) {
  return new Vector({
    x: this.x*n,
    y: this.y*n
  });
}

Vector.prototype.normalize = function() {
  return this.divide(this.magnitude());
}

/*
Euclidean Distance: dist(a,b) = Vector(ax-bx,ay,by)
*/
export function euclideanDistance(a, b) {
  let dx = a.x-b.x
  let dy = a.y-b.y
  return new Vector({ x: dx, y: dy });
}

/*
  Calculating velocity from momentary acceleration: v = v0 + at
  v0 is always 0
*/
function calculateVelocity(vertex, t) {
  let dampening = 0.5;
  let a = vertex.acceleration.multiply(t);
  return a.multiply(dampening);
}

/*
  Calculating position from velocity: x = x0 + 1/2(v0+v)t
  To prevent spring recoil effect, we assume velocity is 0 at the start of
  every iteration, so including v0 in the position equation is unnecessary.
*/
export function calculatePosition(vertex, t) {
  let v = calculateVelocity(vertex, t)
  let x0 = vertex.x;
  let y0 = vertex.y;
  return {
    x: x0+0.5*(v.x)*t,
    y: y0+0.5*(v.y)*t
  };
}
