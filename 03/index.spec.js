const { Grid } = require('./index');

// R75,D30,R83,U83,L12,D49,R71,U7,L72
// U62,R66,U55,R34,D71,R55,D58,R83 = distance 159

describe('03', () => {
  it('tacos', () => {
    const grid = new Grid(100, 100);
    grid.append('U10,R40');
    grid.append('R10,U20,R15,D15');
    grid.output();
  });
});
