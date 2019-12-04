class Grid {
  constructor(x, y) {
    this.grid = new Array(y).fill(null).map(() => {
      return new Array(x).fill('.');
    });
  }

  append(input) {
    let x = 10;
    let y = 10;
    const paths = input.split(',');
    for (let path of paths) {
      this.grid[x][y] = '+';
      const direction = path.slice(0, 1);
      const amount = path.slice(1);
      switch (direction) {
        case 'U':
          for (let i = 0; i < amount; i++) {
            y++;
            this.grid[x][y] = '|';
          }
          break;
        case 'D':
          for (let i = 0; i < amount; i++) {
            y--;
            this.grid[x][y] = '|';
          }
          break;
        case 'L':
          for (let i = 0; i < amount; i++) {
            x--;
            this.grid[x][y] = '-';
          }
          break;
        case 'R':
          for (let i = 0; i < amount; i++) {
            x++;
            this.grid[x][y] = '-';
          }
          break;
      }
    }
  }

  output() {
    const output = this.grid.map((r) => {
      return r.join('');
    }).join('\n');
    console.log(output);
  }
}

module.exports = { Grid };
