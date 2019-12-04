class Grid {
  constructor(x, y) {
    this.grid = {};
    this.intersections = [];
  }

  append({ id, input }) {
    let x = 0;
    let y = 0;
    const paths = input.split(',');
    for (let path of paths) {
      const direction = path.slice(0, 1);
      const length = path.slice(1);

      for (let i = 0; i < length; i++) {
        switch (direction) {
          case 'U':
            y++;
            break;
          case 'D':
            y--;
            break;
          case 'R':
            x++;
            break;
          case 'L':
            x--;
            break;
        }
        const name = `${x},${y}`;
        const point = { id, x, y };

        const previous = this.grid[name] || [];
        const filtered = previous.filter(point => point.id != id);
        if (filtered.length) {
          const distance = Math.abs(x) + Math.abs(y);
          this.intersections.push({ x, y, distance });
        }

        this.grid[name] = [...previous, point];
      }
    }
  }

  get nearest() {
    const distances = this.intersections.map(intersection => intersection.distance);
    return Math.min(...distances);
  }
}

module.exports = { Grid };
