const DIRECTIONS = ['N', 'E', 'S', 'W'];

class Robot {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.direction = 0;
  }

  move() {
    switch (this.direction) {
      case 0:
        this.y++;
        break;
      case 1:
        this.x++;
        break;
      case 2:
        this.y--;
        break;
      case 3:
        this.x--;
        break;
    }
  }

  turn(right = 0) {
    const length = DIRECTIONS.length;
    if (right) {
      this.direction = (this.direction + 1) % length;
    } else {
      this.direction = (this.direction - 1 + length) % length;
    }
  }
}

module.exports = { Robot };
