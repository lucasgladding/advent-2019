class Chemical {
  constructor(quantity, name) {
    this.units = quantity;
    this.name = name;
  }

  times(value) {
    return new Chemical(this.units * value, this.name);
  }
}

module.exports = { Chemical };
