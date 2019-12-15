class Reaction {
  constructor(input, output) {
    this.input = input;
    this.output = output;
  }

  times(value) {
    const input = this.input.map(item => item.times(value));
    const output = this.output.times(value);
    return new Reaction(input, output);
  }
}

module.exports = { Reaction };
