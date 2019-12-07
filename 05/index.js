class Program {
  constructor(memory) {
    this.memory = memory;
    this.address = -1;
  }

  run(input = 0) {
    const output = [];
    this.address = 0;
    while (this.memory[this.address] && this.memory[this.address] !== 99) {
      const { operation, modes } = this.parse_instruction();
      switch (operation) {
        case 1:
          this.add(modes);
          break;
        case 2:
          this.multiply(modes);
          break;
        case 3:
          this.input(input);
          break;
        case 4:
          this.output(modes, output);
          break;
        case 5:
          this.jump_if_true(modes);
          break;
        case 6:
          this.jump_if_false(modes);
          break;
        case 7:
          this.less_than(modes);
          break;
        case 8:
          this.equals(modes);
          break;
        default:
          this.address += 4;
          break;
      }
    }
    return output;
  }

  add(modes) {
    const parameter_1 = this.get_parameter(1, modes[0]);
    const parameter_2 = this.get_parameter(2, modes[1]);
    const parameter_3 = this.get_parameter(3, 1);
    this.set_address_value(parameter_3, parameter_1 + parameter_2);
    this.address += 4;
  }

  multiply(modes) {
    const parameter_1 = this.get_parameter(1, modes[0]);
    const parameter_2 = this.get_parameter(2, modes[1]);
    const parameter_3 = this.get_parameter(3, 1);
    this.set_address_value(parameter_3, parameter_1 * parameter_2);
    this.address += 4;
  }

  input(input) {
    const parameter_1 = this.get_parameter(1, 1);
    this.set_address_value(parameter_1, input);
    this.address += 2;
  }

  output(modes, output) {
    const parameter_1 = this.get_parameter(1, modes[0]);
    output.push(parameter_1);
    this.address += 2;
  }

  jump_if_true(modes) {
    const parameter_1 = this.get_parameter(1, modes[0]);
    const parameter_2 = this.get_parameter(2, modes[1]);
    if (parameter_1) {
      this.address = parameter_2;
    } else {
      this.address += 3;
    }
  }

  jump_if_false(modes) {
    const parameter_1 = this.get_parameter(1, modes[0]);
    const parameter_2 = this.get_parameter(2, modes[1]);
    if (!parameter_1) {
      this.address = parameter_2;
    } else {
      this.address += 3;
    }
  }

  less_than(modes) {
    const parameter_1 = this.get_parameter(1, modes[0]);
    const parameter_2 = this.get_parameter(2, modes[1]);
    const parameter_3 = this.get_parameter(3, 1);
    this.set_address_value(parameter_3, parameter_1 < parameter_2 ? 1 : 0);
    this.address += 4;
  }

  equals(modes) {
    const parameter_1 = this.get_parameter(1, modes[0]);
    const parameter_2 = this.get_parameter(2, modes[1]);
    const parameter_3 = this.get_parameter(3, 1);
    this.set_address_value(parameter_3, parameter_1 === parameter_2 ? 1 : 0);
    this.address += 4;
  }

  get_parameter(index, mode = 0) {
    const value = this.memory[this.address + index];
    return mode === 1 ? value : this.memory[value];
  }

  set_address_value(address, value) {
    this.memory[address] = value;
  }

  parse_instruction() {
    const instruction = this.memory[this.address];
    const operation = instruction % 100;
    const modes = [
      this.get_digit(instruction, 2),
      this.get_digit(instruction, 3),
      this.get_digit(instruction, 4),
    ];
    return { operation, modes };
  }

  get_digit(num, pos) {
    return Math.floor(num / Math.pow(10, pos) % 10);
  }
}

function run(memory, input = 0) {
  const program = new Program(memory);
  return program.run(input);
}

module.exports = { run };
