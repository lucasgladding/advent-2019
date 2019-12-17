const DIRECTIONS = ['N', 'E', 'S', 'W'];

class Space {
  constructor(distance) {
    this.type = 'space';
    this.distance = distance;
    this.directions = {};
  }

  get_next_direction() {
    const next = this.get_next_undefined();

    if (next) {
      return next;
    }

    return this.get_previous();
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
      const distance = this.distance - 1;
      if (node.distance === distance) {
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
