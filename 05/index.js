class Program {
  constructor(instructions, inputs = [], outputs = []) {
    this.memory = instructions;
    this.address = 0;
    this.inputs = inputs;
    this.outputs = outputs;
    this.paused = false;
    this.done = false;
  }

  run() {
    this.paused = false;
    while (this.is_running()) {
      const { operation, modes } = this.parse();
      switch (operation) {
        case 1:
          this.ADD(modes);
          break;
        case 2:
          this.MUL(modes);
          break;
        case 3:
          this.IN();
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
        case 99:
          this.done = true;
          break;
        default:
          this.address += 4;
          break;
      }
    }
    return this.outputs;
  }

  is_running() {
    return this.memory[this.address] && !this.done && !this.paused;
  }

  ADD(modes) {
    const parameter_1 = this.get_parameter(1, modes[0]);
    const parameter_2 = this.get_parameter(2, modes[1]);
    const parameter_3 = this.get_parameter(3, 1);
    this.set_address_value(parameter_3, parameter_1 + parameter_2);
    this.address += 4;
  }

  MUL(modes) {
    const parameter_1 = this.get_parameter(1, modes[0]);
    const parameter_2 = this.get_parameter(2, modes[1]);
    const parameter_3 = this.get_parameter(3, 1);
    this.set_address_value(parameter_3, parameter_1 * parameter_2);
    this.address += 4;
  }

  IN() {
    const parameter_1 = this.get_parameter(1, 1);
    const value = this.inputs.shift();
    this.set_address_value(parameter_1, value);
    this.address += 2;
  }

  OUT(modes) {
    const parameter_1 = this.get_parameter(1, modes[0]);
    this.outputs.push(parameter_1);
    this.address += 2;
  }

  JMP_TRUE(modes) {
    const parameter_1 = this.get_parameter(1, modes[0]);
    const parameter_2 = this.get_parameter(2, modes[1]);
    if (parameter_1) {
      this.address = parameter_2;
    } else {
      this.address += 3;
    }
  }

  JMP_FALSE(modes) {
    const parameter_1 = this.get_parameter(1, modes[0]);
    const parameter_2 = this.get_parameter(2, modes[1]);
    if (!parameter_1) {
      this.address = parameter_2;
    } else {
      this.address += 3;
    }
  }

  LT(modes) {
    const parameter_1 = this.get_parameter(1, modes[0]);
    const parameter_2 = this.get_parameter(2, modes[1]);
    const parameter_3 = this.get_parameter(3, 1);
    this.set_address_value(parameter_3, parameter_1 < parameter_2 ? 1 : 0);
    this.address += 4;
  }

  EQ(modes) {
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

  parse() {
    const instruction = this.memory[this.address];
    const operation = instruction % 100;
    const modes = [
      this.get_digit(instruction, 2),
      this.get_digit(instruction, 3),
      this.get_digit(instruction, 4),
    ];
    return { operation, modes };
  }

  get_digit(input, pos) {
    return Math.floor(input / Math.pow(10, pos) % 10);
  }
}

function run(instructions, input = []) {
  const program = new Program(instructions, input);
  return program.run();
}

module.exports = { Program, run };
