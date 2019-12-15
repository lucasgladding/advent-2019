const { parse } = require('./index');

const example_1 = require('./example-1.txt');

describe('14', () => {
  it('example 1', () => {
    const structure = parse(example_1);
    console.log('structure', structure);
  });
});
