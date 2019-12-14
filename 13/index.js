const { chunk } = require('./helpers');
const { Program } = require('./program');
const input = require('./input');

function run() {
  const outputs = [];
  const program = new Program(input);
  while (!program.done) {
    const output = program.run();
    if (output !== null) {
      outputs.push(output);
    }
  }
  const groups = chunk(outputs, 3);
  const ids = groups.map(item => item[2]);
  return ids.filter(id => id === 2).length;
}

module.exports = { run };
