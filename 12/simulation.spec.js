const { Point, Simulation } = require('./simulation');

describe('12/simulation', () => {
  it('part 2', () => {
    const count_x = count([4, 11, -2, -7]);
    const count_y = count([1, -18, -10, -2]);
    const count_z = count([1, -1, -4, 14]);
    const common_a = common(count_x, count_y);
    const common_b = common(common_a, count_z);
    expect(common_b).toEqual(326365108375488);
  });
});

function count(positions) {
  const points = positions.map(p => new Point(p));
  const simulation = new Simulation(points);
  const targets = positions.map(p => new Point(p));
  return simulation.count(targets);
}

function common(a, b) {
  for (let i = 1; i <= 1000000; i++) {
    const target = a * i;
    if (target % b === 0) {
      return target;
    }
  }
  return -1;
}
