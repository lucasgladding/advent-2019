const Direction = {
  N: 1,
  S: 2,
  W: 3,
  E: 4,
};

class Robot {
  constructor() {
    this.location = { x: 0, y: 0 };
  }

  current(x, y) {
    return this.location.x === x && this.location.y === y;
  }

  target(direction) {
    const target = { ...this.location };
    switch (direction) {
      case 'N':
        target.y += 1;
        break;
      case 'S':
        target.y -= 1;
        break;
      case 'W':
        target.x -= 1;
        break;
      case 'E':
        target.x += 1;
        break;
    }
    return target;
  }

  move(direction) {
    this.location = this.target(direction);
    return this.location;
  }
}

module.exports = { Robot, Direction };
