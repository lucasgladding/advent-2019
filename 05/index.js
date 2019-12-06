function run(input, id = 0) {
  const output = [];
  let pos = 0;
  while (input[pos] && input[pos] != 99) {
    const { operation, modes } = parse(input[pos]);
    const pos1 = input[pos + 1];
    const pos2 = input[pos + 2];
    const pos3 = input[pos + 3];
    const input1 = modes[0] == 1 ? pos1 : input[pos1];
    const input2 = modes[1] == 1 ? pos2 : input[pos2];
    switch (operation) {
      case 1:
        input[pos3] = input1 + input2;
        pos += 4;
        break;
      case 2:
        input[pos3] = input1 * input2;
        pos += 4;
        break;
      case 3:
        input[pos1] = id;
        pos += 2;
        break;
      case 4:
        output.push(input1);
        pos += 2;
        break;
      case 5:
        if (input1 != 0) {
          pos = input2;
        } else {
          pos += 3;
        }
        break;
      case 6:
        if (input1 == 0) {
          pos = input2;
        } else {
          pos += 3;
        }
        break;
      case 7:
        input[pos3] = input1 < input2 ? 1 : 0;
        pos += 4;
        break;
      case 8:
        input[pos3] = input1 == input2 ? 1 : 0;
        pos += 4;
        break;
      default:
        pos += 4;
        break;
    }
  }
  return output;
}

function parse(instruction) {
  const string = instruction.toString();
  const operation = parseInt(string.slice(-2));
  const modes = string.slice(0, -2)
    .split("")
    .reverse()
    .map(mode => parseInt(mode));
  return { operation, modes };
}

module.exports = { run };
