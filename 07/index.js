const { Program } = require('./program');

function run(instructions, inputs = []) {
  let output;
  const program = new Program(instructions);
  output = program.run();
  for (let input of inputs) {
    output = program.run(input);
  }
  return output;
}

function evaluate(instructions, sequence) {
  return sequence.reduce((input, phase) => {
    const inputs = [phase, input];
    return run([...instructions], inputs);
  }, 0);
}

function loop(instructions, sequence) {
  const programs = sequence.map((phase) => {
    const program = new Program([...instructions]);
    program.run(phase);
    return program;
  });

  let index = 0;
  let input = 0;
  let output;
  while (true) {
    const program = programs[index];
    output = program.run(input) || program.output;
    input = output;
    if (index === programs.length - 1 && program.done) {
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
