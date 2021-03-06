class Storage {
  constructor() {
    this.storage = {};
  }

  get(name) {
    return this.storage[name];
  }

  set(name, value) {
    this.storage[name] = value;
  }
}

module.exports = { Storage };
