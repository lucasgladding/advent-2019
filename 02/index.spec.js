const { run, calculate } = require('./index');
const input = require('./input');

// 1,0,0,0,99 becomes 2,0,0,0,99 (1 + 1 = 2).
// 2,3,0,3,99 becomes 2,3,0,6,99 (3 * 2 = 6).
// 2,4,4,5,99,0 becomes 2,4,4,5,99,9801 (99 * 99 = 9801).
// 1,1,1,4,99,5,6,0,99 becomes 30,1,1,4,2,5,6,0,99.

describe('02', () => {
  it('runs 1', () => {
    const output = run([1,0,0,0,99]);
    expect(output).toEqual([2,0,0,0,99]);
  });

  it('runs 2', () => {
    const output = run([2,3,0,3,99]);
    expect(output).toEqual([2,3,0,6,99]);
  });

  it('runs 3', () => {
    const output = run([2,4,4,5,99,0]);
    expect(output).toEqual([2,4,4,5,99,9801]);
  });

  it('runs 4', () => {
    const output = run([1,1,1,4,99,5,6,0,99]);
    expect(output).toEqual([30,1,1,4,2,5,6,0,99]);
  });

  it('problem 2', () => {
    const output = calculate(input, 19690720);
    expect(output).toEqual(4559);
  });
});
