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

function calculate(input, target) {
  for (let i = 0; i <= 99; i++) {
    for (let j = 0; j <= 99; j++) {
      const input0 = [...input];
      input0[1] = i;
      input0[2] = j;
      const output = run(input0);
      if (output[0] == target) {
        return i * 100 + j;
      }
    }
  }
}

module.exports = {
  run,
  calculate
};
