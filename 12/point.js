class Point {
  constructor(position) {
    this.position = position;
    this.velocity = 0;
  }

  apply(changes) {
    for (let change of changes) {
      this.velocity += change;
    }
  }

  step() {
    this.position += this.velocity;
  }

  equals(target) {
    return this.position === target.position && this.velocity === target.velocity;
  }
}

module.exports = { Point };
