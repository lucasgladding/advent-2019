const { sum } = require('./index');
const input_1 = require('./input-1.txt');

describe('17', () => {
  it('example 1', () => {
    const input = parse(input_1);
    let output = sum(input);
    expect(output).toEqual(76);
  });
});

function parse(input) {
  return input.split('\n').filter(line => line);
}
