class Grid {
  constructor(x, y) {
    this.grid = {};
    this.intersections = [];
  }

  append({ id, input }) {
    let x = 0;
    let y = 0;
    let steps = 0;

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

        steps++;

        const name = `${x},${y}`;
        const data = { id, x, y, steps };

        const previous = this.grid[name] || [];
        const points = previous.filter(point => point.id != id).sort((a, b) => (a.steps - b.steps));
        if (points.length) {
          const distance = Math.abs(x) + Math.abs(y);
          const tacos = steps + points[0].steps;
          this.intersections.push({ x, y, distance, steps: tacos });
        }

        this.grid[name] = [...previous, data];
      }
    }
  }

  get nearest() {
    const distances = this.intersections.map(intersection => intersection.distance);
    return Math.min(...distances);
  }

  get steps() {
    const steps = this.intersections.map(intersection => intersection.steps);
    return Math.min(...steps);
  }
}

module.exports = { Grid };
