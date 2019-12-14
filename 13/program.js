const noop = () => {};

class Program {
  constructor(memory, output = noop) {
    this.memory = memory;
    this.address = 0;
    this.base = 0;
    this.output = output;
  }

  get done() {
    return this.memory[this.address] === 99;
  }

  run(input = null) {
    while (this.memory[this.address] && !this.done) {
      const { operation, modes } = this.parse();
      switch (operation) {
        case 1:
          this.ADD(modes);
          break;
        case 2:
          this.MUL(modes);
          break;
        case 3:
          if (input === null) {
            return;
          }
          this.IN(input, modes);
          input = null;
          break;
        case 4:
          this.OUT(modes);
          break;
        case 5:
          this.JMP_TRUE(modes);
          break;
        case 6:
          this.JMP_FALSE(modes);
          break;
        case 7:
          this.LT(modes);
          break;
        case 8:
          this.EQ(modes);
          break;
        case 9:
          this.REL(modes);
          break;
        default:
          throw 'unrecognized operation';
      }
    }
    return null;
  }

  parse() {
    function digit(input, pos) {
      return Math.floor(input / Math.pow(10, pos) % 10);
    }

    const instruction = this.memory[this.address];
    const operation = instruction % 100;
    const modes = [
      digit(instruction, 2),
      digit(instruction, 3),
      digit(instruction, 4),
    ];
    return { operation, modes };
  }

  ADD(modes) {
    const parameter_1 = this.parameter(1, modes[0]);
    const parameter_2 = this.parameter(2, modes[1]);
    const parameter_3 = this.parameter(3, 1);
    this.log('ADD', { parameter_1, parameter_2, parameter_3 });
    this.set(parameter_3, parameter_1 + parameter_2, modes[2]);
    this.address += 4;
  }

  MUL(modes) {
    const parameter_1 = this.parameter(1, modes[0]);
    const parameter_2 = this.parameter(2, modes[1]);
    const parameter_3 = this.parameter(3, 1);
    this.log('MUL', { parameter_1, parameter_2, parameter_3 });
    this.set(parameter_3, parameter_1 * parameter_2, modes[2]);
    this.address += 4;
  }

  IN(input, modes) {
    const parameter_1 = this.parameter(1, 1);
    this.log('IN', { parameter_1 });
    this.set(parameter_1, input, modes[0]);
    this.address += 2;
  }

  OUT(modes) {
    const parameter_1 = this.parameter(1, modes[0]);
    this.log('OUT', { parameter_1 });
    this.output(parameter_1);
    this.address += 2;
  }

  JMP_TRUE(modes) {
    const parameter_1 = this.parameter(1, modes[0]);
    const parameter_2 = this.parameter(2, modes[1]);
    this.log('JMP_TRUE', { parameter_1, parameter_2 });
    if (parameter_1 !== 0) {
      this.address = parameter_2;
    } else {
      this.address += 3;
    }
  }

  JMP_FALSE(modes) {
    const parameter_1 = this.parameter(1, modes[0]);
    const parameter_2 = this.parameter(2, modes[1]);
    this.log('JMP_FALSE', { parameter_1, parameter_2 });
    if (parameter_1 === 0) {
      this.address = parameter_2;
    } else {
      this.address += 3;
    }
  }

  LT(modes) {
    const parameter_1 = this.parameter(1, modes[0]);
    const parameter_2 = this.parameter(2, modes[1]);
    const parameter_3 = this.parameter(3, 1);
    this.log('LT', { parameter_1, parameter_2, parameter_3 });
    this.set(parameter_3, parameter_1 < parameter_2 ? 1 : 0, modes[2]);
    this.address += 4;
  }

  EQ(modes) {
    const parameter_1 = this.parameter(1, modes[0]);
    const parameter_2 = this.parameter(2, modes[1]);
    const parameter_3 = this.parameter(3, 1);
    this.log('EQ', { parameter_1, parameter_2, parameter_3 });
    this.set(parameter_3, parameter_1 === parameter_2 ? 1 : 0, modes[2]);
    this.address += 4;
  }

  REL(modes) {
    const parameter_1 = this.parameter(1, modes[0]);
    this.log('REL', { parameter_1 });
    this.base += parameter_1;
    this.address += 2;
  }

  parameter(index, mode = 0) {
    const position = this.memory[this.address + index];
    return this.get(position, mode);
  }

  get(position, mode = 0) {
    if (mode === 2) {
      return this.memory[this.base + position] || 0;
    }
    if (mode === 1) {
      return position || 0;
    }
    return this.memory[position] || 0;
  }

  set(position, value, mode = 0) {
    if (mode === 2) {
      this.memory[this.base + position] = value;
    } else {
      this.memory[position] = value;
    }
  }

  log(message, data) {
    // data['address'] = this.address;
    // data['base'] = this.base;
    // console.log(message, data);
  }
}

module.exports = { Program };
