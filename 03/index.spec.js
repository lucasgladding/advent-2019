const { Grid } = require('./index');

// R75,D30,R83,U83,L12,D49,R71,U7,L72
// U62,R66,U55,R34,D71,R55,D58,R83 = distance 159

describe('03', () => {
  it('tacos', () => {
    const grid = new Grid(100, 100);
    grid.append({ id: 0, input: 'R75,D30,R83,U83,L12,D49,R71,U7,L72' });
    grid.append({ id: 1, input: 'U62,R66,U55,R34,D71,R55,D58,R83' });
    expect(grid.nearest).toEqual(159);
  });
});
