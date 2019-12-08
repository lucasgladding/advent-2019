class Program {
  constructor(instructions) {
    this.memory = instructions;
    this.address = 0;
    this.outputs = [];
  }

  run(input = null) {
    while (this.memory[this.address] && this.memory[this.address] !== 99) {
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
          this.IN(input);
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
        default:
          this.address += 4;
          break;
      }
    }
    return this.outputs;
  }

  ADD(modes) {
    const parameter_1 = this.parameter(1, modes[0]);
    const parameter_2 = this.parameter(2, modes[1]);
    const parameter_3 = this.parameter(3, 1);
    this.memory[parameter_3] = parameter_1 + parameter_2;
    this.address += 4;
  }

  MUL(modes) {
    const parameter_1 = this.parameter(1, modes[0]);
    const parameter_2 = this.parameter(2, modes[1]);
    const parameter_3 = this.parameter(3, 1);
    this.memory[parameter_3] = parameter_1 * parameter_2;
    this.address += 4;
  }

  IN(input) {
    const parameter_1 = this.parameter(1, 1);
    this.memory[parameter_1] = input;
    this.address += 2;
  }

  OUT(modes) {
    const parameter_1 = this.parameter(1, modes[0]);
    this.outputs.push(parameter_1);
    this.address += 2;
  }

  JMP_TRUE(modes) {
    const parameter_1 = this.parameter(1, modes[0]);
    const parameter_2 = this.parameter(2, modes[1]);
    if (parameter_1) {
      this.address = parameter_2;
    } else {
      this.address += 3;
    }
  }

  JMP_FALSE(modes) {
    const parameter_1 = this.parameter(1, modes[0]);
    const parameter_2 = this.parameter(2, modes[1]);
    if (!parameter_1) {
      this.address = parameter_2;
    } else {
      this.address += 3;
    }
  }

  LT(modes) {
    const parameter_1 = this.parameter(1, modes[0]);
    const parameter_2 = this.parameter(2, modes[1]);
    const parameter_3 = this.parameter(3, 1);
    this.memory[parameter_3] = parameter_1 < parameter_2 ? 1 : 0;
    this.address += 4;
  }

  EQ(modes) {
    const parameter_1 = this.parameter(1, modes[0]);
    const parameter_2 = this.parameter(2, modes[1]);
    const parameter_3 = this.parameter(3, 1);
    this.memory[parameter_3] = parameter_1 === parameter_2 ? 1 : 0;
    this.address += 4;
  }

  parameter(index, mode = 0) {
    const value = this.memory[this.address + index];
    return mode === 1 ? value : this.memory[value];
  }

  parse() {
    const instruction = this.memory[this.address];
    const operation = instruction % 100;
    const modes = [
      this.digit(instruction, 2),
      this.digit(instruction, 3),
      this.digit(instruction, 4),
    ];
    return { operation, modes };
  }

  digit(input, pos) {
    return Math.floor(input / Math.pow(10, pos) % 10);
  }
}

function run(instructions, inputs = []) {
  let outputs;
  const program = new Program(instructions);
  outputs = program.run();
  for (let input of inputs) {
    outputs = program.run(input);
  }
  return outputs;
}

module.exports = { Program, run };
