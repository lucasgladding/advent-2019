const { Grid } = require('./grid');
const { Program } = require('./program');
const { Robot } = require('./robot');

const input = require('./input');

function paint() {
  const grid = new Grid();
  grid.set(0, 0, 1);
  const program = new Program(input);
  const robot = new Robot();
  for (let i = 0; i < 20000; i++) {
    const current = grid.get(robot.x, robot.y);
    const white = program.run(current);
    const right = program.run();
    grid.set(robot.x, robot.y, white);
    robot.turn(right);
    robot.move();
  }
  console.log(grid.count);
  console.log(grid.print());
}

module.exports = { paint };
