class Grid {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.grid = new Array(y).fill(null).map(() => {
      return new Array(x).fill('.');
    });
  }

  append(input) {
    let x = this.x / 2;
    let y = this.y / 2;
    this.update(x, y, 'o');
    const paths = input.split(',');
    for (let path of paths) {
      const direction = path.slice(0, 1);
      const amount = path.slice(1);
      switch (direction) {
        case 'U':
          for (let i = 0; i < amount; i++) {
            y++;
            this.update(x, y, '|');
          }
          break;
        case 'D':
          for (let i = 0; i < amount; i++) {
            y--;
            this.update(x, y, '|');
          }
          break;
        case 'L':
          for (let i = 0; i < amount; i++) {
            x--;
            this.update(x, y, '-');
          }
          break;
        case 'R':
          for (let i = 0; i < amount; i++) {
            x++;
            this.update(x, y, '-');
          }
          break;
      }
      this.update(x, y, '+');
    }
  }

  update(x, y, symbol) {
    const y1 = this.grid.length - 1 - y;
    const current = this.grid[y1][x];
    if (symbol == '+') {
      this.grid[y1][x] = '+';
    } else if (current == '-' || current == '|') {
      this.grid[y1][x] = 'X';
    } else {
      this.grid[y1][x] = symbol;
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
