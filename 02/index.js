function run(input) {
  let pos = 0;
  while (input[pos] && input[pos] != 99) {
    const operation = input[pos];
    const pos1 = input[pos + 1];
    const pos2 = input[pos + 2];
    const pos3 = input[pos + 3];
    const input1 = input[pos1];
    const input2 = input[pos2];
    switch (operation) {
      case 1:
        input[pos3] = input1 + input2;
        break;
      case 2:
        input[pos3] = input1 * input2;
        break;
    }
    pos = pos + 4;
  }
  return input;
}

module.exports = { run };
