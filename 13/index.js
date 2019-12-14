const { chunk } = require('./helpers');
const { Program } = require('./program');
const input = require('./input');

function run() {
  const outputs = [];
  function output(value) {
    outputs.push(value);
  }

  const program = new Program(input, output);
  while (!program.done) {
    program.run();
  }

  const groups = chunk(outputs, 3);
  const ids = groups.map(group => group[2]);
  return ids.filter(id => id === 2).length;
}

module.exports = { run };
