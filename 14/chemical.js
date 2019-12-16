class Chemical {
  constructor(units, name) {
    this.units = units;
    this.name = name;
  }

  times(amount) {
    return new Chemical(this.units * amount, this.name);
  }
}

module.exports = { Chemical };
