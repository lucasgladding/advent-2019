const { Program } = require('./program');
const input = require('./input');

const directions = [
  'A,B,A,B,C,C,B,A,B,C',
  'L,12,L,6,L,8,R,6',
  'L,8,L,8,R,4,R,6,R,6',
  'L,12,R,6,L,8',
  'n',
];

describe('17.02', () => {
  it('part 2', () => {
    let outputs = [];
    function output(value) {
      outputs.push(value);
    }

    const program = new Program(input, output);
    program.run();

    run(program, directions[0]);
    run(program, directions[1]);
    run(program, directions[2]);
    run(program, directions[3]);
    run(program, directions[4]);

    expect(outputs.pop()).toEqual(897344);
  });
});

function run(program, string) {
  const inputs = encode(string);
  for (let input of inputs) {
    program.run(input);
  }
}

function encode(string) {
  const chars = string.split('').map(char => char.charCodeAt(0));
  return [...chars, 10];
}
