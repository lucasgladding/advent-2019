class Reaction {
  constructor(input, output) {
    this.input = input;
    this.output = output;
  }

  for(amount) {
    const times = Math.ceil(amount / this.output.units);
    const input = this.input.map(item => item.times(times));
    const output = this.output.times(times);
    return new Reaction(input, output);
  }
}

module.exports = { Reaction };
