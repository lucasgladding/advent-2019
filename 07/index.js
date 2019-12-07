const { run } = require('../05/index');

function evaluate(program, sequence) {
  return sequence.reduce((input, i) => {
    return start([...program], [i, input]);
  }, 0);
}

function start(program, input) {
  const output = run(program, input);
  return output[0];
}

// 0,1,2
// 0,2,1
// 1,0,2
// 1,2,0
// 2,0,1
// 2,1,0

function permutations(options) {
  if (options.length === 1) {
    return [options];
  }
  const output = [];
  for (let i of options) {
    const filt = options.filter(option => option !== i);
    const perm = permutations(filt);
    for (let j of perm) {
      output.push([i, ...j]);
    }
  }
  return output;
}

module.exports = { evaluate, permutations };
