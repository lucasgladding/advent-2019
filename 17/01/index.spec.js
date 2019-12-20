const { sum } = require('./index');
const { Program } = require('./program');
const input = require('./input');
const input_1 = require('./input-1.txt');

describe('17', () => {
  it('example 1', () => {
    const input = parse(input_1);
    const output = sum(input);
    expect(output).toEqual(76);
  });


  it('part 1', () => {
    let image = run(input);
    console.log(image);
    const parsed_input = parse(image);
    const output = sum(parsed_input);
    expect(output).toEqual(6024);
  });
});

function parse(input) {
  return input.split('\n').filter(line => line);
}

// 35 means #, 46 means ., 10 starts a new line

function run(input) {
  let output = '';
  function process(value) {
    output += map(value);
  }
  const program = new Program(input, process);
  program.run();
  return output;
}

function map(value) {
  switch (value) {
    case 35:
      return '#';
    case 46:
      return '.';
    case 10:
      return '\n';
  }
  return 'D';
}
