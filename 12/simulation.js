const { Point } = require('./point');

class Simulation {
  constructor(points) {
    this.points = points;
  }

  step() {
    const list = this.points.map((point, index) => {
      const points = [
        ...this.points.slice(0, index),
        ...this.points.slice(index + 1),
      ];
      return points.map((p) => this.dimension(point.position, p.position));
    });
    this.points.map((point, index) => {
      const changes = list[index];
      point.apply(changes);
      point.step();
    });
  }

  dimension(a, b) {
    if (b > a) {
      return +1;
    }
    if (b < a) {
      return -1;
    }
    return 0;
  }

  count(targets, limit = 1000000) {
    for (let i = 1; i <= limit; i++) {
      this.step();
      if (this.equals(targets)) {
        return i;
      }
    }
    return -1;
  }

  equals(targets) {
    return this.points.every((point, index) => {
      return point.equals(targets[index]);
    });
  }
}

module.exports = { Point, Simulation };
