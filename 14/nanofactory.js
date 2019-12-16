const { Chemical } = require('./chemical');

class Nanofactory {
  constructor(reactions) {
    this.reactions = reactions;
    this.mine = 0;
    this.excess = {};
  }

  produce(units, name) {
    let required = units;
    let excess = this.get_excess(name);
    if (excess > 0) {
      const used = Math.min(excess, required);
      this.excess[name] -= used;
      required -= used;
      this.debug(`retrieve ${used} ${name} from excess`);
    }

    if (required === 0) {
      return;
    }

    const reaction = this.reactions.get(name);
    if (!reaction) {
      this.debug(`mine ${required} ${name}`);
      this.mine += required;
      return;
    }

    this.debug(`create ${required} ${name} using recipe`);
    const recipe = reaction.for(required);
    recipe.input.map((input) => this.produce(input.units, input.name));

    const excess_units = recipe.output.units - required;
    this.excess[name] = this.get_excess(name) + excess_units;
    this.debug(`save ${excess_units} ${name}`);
  }

  get_excess(name) {
    return this.excess[name] || 0;
  }

  debug(message, data) {
    // console.log(message, data);
  }
}

module.exports = { Nanofactory };
