class Grid {
  constructor() {
    this.storage = {};
  }

  get count() {
    return Object.values(this.storage).length;
  }

  get(x, y) {
    const name = this.name(x, y);
    return this.storage[name] || 0;
  }

  set(x, y, value) {
    const name = this.name(x, y);
    this.storage[name] = value;
  }

  name(x, y) {
    return `${x},${y}`;
  }

  print(min = -100, max = 100) {
    let output = '';
    for (let y = min; y < max; y++) {
      for (let x = min; x < max; x++) {
        const name = this.name(x, y);
        const tacos = this.storage[name] || 0;
        output += tacos ? '#' : '.';
      }
      output += '\n';
    }
    return output;
  }
}

module.exports = { Grid };
