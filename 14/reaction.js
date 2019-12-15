class Reaction {
  constructor(input, output) {
    this.input = input;
    this.output = output;
  }

  source(storage, units = 1) {
    const inputs = this.enough(units);
    return inputs.map((input) => {
      if (input.name === 'ORE') {
        return [input];
      }
      const reaction = storage.get(input.name);
      return reaction.source(storage, input.units);
    });
  }

  enough(units) {
    const m = Math.ceil(units / this.output.units);
    return this.input.map(item => item.times(m));
  }
}

module.exports = { Reaction };
