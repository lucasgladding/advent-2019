const DIRECTIONS = ['N', 'E', 'S', 'W'];

class Space {
  constructor(distance) {
    this.type = 'space';
    this.distance = distance;
    this.directions = {};
  }

  clear() {
    this.distance = 0;
    this.directions = {};
  }

  get_next_direction() {
    const next_undefined = this.get_next_undefined();
    if (!next_undefined) {
      return this.get_previous();
    }
    return next_undefined;
  }

  get_next_undefined() {
    for (let direction of DIRECTIONS) {
      if (!this.directions[direction]) {
        return direction;
      }
    }
  }

  get_previous() {
    for (let direction of DIRECTIONS) {
      const node = this.directions[direction];
      if (node.distance < this.distance) {
        return direction;
      }
    }
  }

  set_space(direction, node) {
    this.directions[direction] = node;
    const opposite = this.get_opposite_direction(direction);
    node.directions[opposite] = this;
  }

  set_wall(direction, node) {
    this.directions[direction] = node;
  }

  get_opposite_direction(direction) {
    const index = DIRECTIONS.indexOf(direction);
    const opposite = (index + 2) % 4;
    return DIRECTIONS[opposite];
  }
}

module.exports = { Space };
