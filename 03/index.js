class Grid {
  constructor(x, y) {
    this.origin = { x: x / 2, y: y / 2 };
    this.grid = new Array(y).fill(null).map(() => {
      return new Array(x).fill('.');
    });
  }

  append(input) {
    let x = this.origin.x;
    let y = this.origin.y;
    this.update(x, y, 'o');

    const paths = input.split(',');
    for (let path of paths) {
      const direction = path.slice(0, 1);
      const amount = path.slice(1);

      for (let i = 0; i < amount; i++) {
        let char;
        switch (direction) {
          case 'U':
            char = '|';
            y++;
            break;
          case 'D':
            char = '|';
            y--;
            break;
          case 'R':
            char = '-';
            x++;
            break;
          case 'L':
            char = '-';
            x--;
            break;
        }
        this.update(x, y, char);
      }
      this.update(x, y, '+');
    }
  }

  update(x, y, symbol) {
    y = this.grid.length - 1 - y;
    const previous = this.grid[y][x];
    if (symbol == '+') {
      this.grid[y][x] = '+';
    } else if (symbol == '-' && previous == '|') {
      this.grid[y][x] = 'X';
    } else if (symbol == '|' && previous == '-') {
      this.grid[y][x] = 'X';
    } else {
      this.grid[y][x] = symbol;
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
