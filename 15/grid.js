class Grid {
  constructor() {
    this.storage = {};
  }

  get(x, y) {
    const item = this.storage[y] || {};
    return item[x] || ' ';
  }

  set(x, y, icon) {
    const item = this.storage[y] || {};
    item[x] = icon;
    this.storage[y] = item;
  }
}

module.exports = { Grid };
