class Position {
  constructor(x = 0, y = 0, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  equals(target) {
    return this.x === target.x && this.y === target.y && this.z === target.z;
  }
}

class Velocity {
  constructor(x = 0, y = 0, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  equals(target) {
    return this.x === target.x && this.y === target.y && this.z === target.z;
  }
}

class Moon {
  constructor(x, y, z) {
    this.position = new Position(x, y, z);
    this.velocity = new Velocity(0, 0, 0);
  }

  apply(changes) {
    for (let change of changes) {
      this.velocity.x += change.x;
      this.velocity.y += change.y;
      this.velocity.z += change.z;
    }
  }

  step() {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    this.position.z += this.velocity.z;
  }

  energy() {
    const pot = Math.abs(this.position.x) + Math.abs(this.position.y) + Math.abs(this.position.z);
    const kin = Math.abs(this.velocity.x) + Math.abs(this.velocity.y) + Math.abs(this.velocity.z);
    return pot * kin;
  }

  equals(target) {
    return this.position.equals(target.position) && this.velocity.equals(target.velocity);
  }
}

module.exports = { Position, Velocity, Moon };
