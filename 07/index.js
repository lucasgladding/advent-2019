const { Program, run } = require('../05/index');

function evaluate(instructions, sequence) {
  return sequence.reduce((input, phase, index) => {
    const inputs = [phase, input];
    const outputs = run([...instructions], inputs);
    return outputs[0];
  }, 0);
}

function loop(instructions, sequence) {
  const programs = sequence.map((phase, index) => {
    const program = new Program([...instructions]);
    program.run(phase);
    return program;
  });

  let index = 0;
  let input = 0;
  while (true) {
    const program = programs[index];
    output = program.run(input);
    input = output;
    const last = programs.length - 1;
    if (index === last && program.done) {
      return output;
    }
    index = (index + 1) % programs.length;
  }
}

function permutations(options) {
  if (options.length === 1) {
    return [options];
  }
  const output = [];
  for (let i of options) {
    const remaining = options.filter(option => option !== i);
    const combinations = permutations(remaining);
    for (let j of combinations) {
      output.push([i, ...j]);
    }
  }
  return output;
}

module.exports = { evaluate, loop, permutations };
