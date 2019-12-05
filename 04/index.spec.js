const { Test } = require('./index');

describe('04', () => {
  const test = new Test();

  // 111111 meets these criteria (double 11, never decreases).
  // 223450 does not meet these criteria (decreasing pair of digits 50).
  // 123789 does not meet these criteria (no double).

  xit('example 1', () => {
    expect(test.test(111111)).toEqual(true);
  });

  xit('example 2', () => {
    expect(test.test(223450)).toEqual(false);
  });

  xit('example 3', () => {
    expect(test.test(123789)).toEqual(false);
  });

  xit('part 1', () => {
    let counter = 0;
    for (let i = 158126; i <= 624574; i++) {
      if (test.test(i)) {
        counter++;
      }
    }
    expect(counter).toEqual(1665);
  });

  // 112233 meets these criteria because the digits never decrease and all repeated digits are exactly two digits long.
  // 123444 no longer meets the criteria (the repeated 44 is part of a larger group of 444).
  // 111122 meets the criteria (even though 1 is repeated more than twice, it still contains a double 22).

  it('example 4', () => {
    expect(test.test(112233)).toEqual(true);
  });

  it('example 5', () => {
    expect(test.test(123444)).toEqual(false);
  });

  it('example 6', () => {
    expect(test.test(111122)).toEqual(true);
  });

  it('part 2', () => {
    let counter = 0;
    for (let i = 158126; i <= 624574; i++) {
      if (test.test(i)) {
        counter++;
      }
    }
    expect(counter).toEqual(1131);
  });
});
