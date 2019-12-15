export class Grid {
  constructor() {
    this.storage = {};
  }

  get(x, y) {
    const item = this.storage[y] || {};
    return item[x];
  }

  set(x, y, value) {
    const item = this.storage[y] || {};
    item[x] = value;
    this.storage[y] = item;
  }
}
