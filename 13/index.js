const { chunk } = require('./helpers');
const { Program } = require('./program');
const input = require('./input');

function run() {
  let count = 0;
  const outputs = [];
  const program = new Program(input);
  while (!program.done) {
    if (count > 20) {
      break;
    }
    count++;

    const output = program.run();
    if (output) {
      outputs.push(output);
    }
  }
  const chunked = chunk(outputs, 3);
  return outputs;
  const ids = chunked.map(item => item[2]);
  return ids.filter(id => id === 2).length;
}

module.exports = { run };
