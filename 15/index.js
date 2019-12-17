const { Grid } = require('./grid');
const { Space, Wall } = require('./nodes');
const { Program } = require('./program');
const { render } = require('./render');
const { Robot } = require('./robot');

const input = require('./input');

//

const grid = new Grid();
const robot = new Robot();

let count = 0;
let current = new Space(0);

grid.set(0, 0, '.');

function output(value) {
  const direction = current.get_next_direction();
  const target = robot.target(direction);
  if (value === 0) {
    const node = new Wall();
    current.set_wall(direction, node);
    grid.set(target.x, target.y, '#');
  }
  if (value > 0) {
    let node;
    const previous = current.directions[direction];
    if (previous) {
      count = previous.distance;
      node = previous;
    } else {
      count++;
      node = new Space(count);
    }
    current.set_space(direction, node);
    current = node;
    grid.set(target.x, target.y, '.');
    robot.move(direction);
  }
  if (value === 2) {
    console.log('FOUND', current.distance);
    grid.set(target.x, target.y, 'X');
  }
  render(grid, robot);
}

const program = new Program(input, output);

function get_input(direction) {
  switch (direction) {
    case 'N':
      return 1;
    case 'S':
      return 2;
    case 'W':
      return 3;
    case 'E':
      return 4;
  }
}

function run() {
  const direction = current.get_next_direction();
  const input = get_input(direction);
  program.run(input);

  setTimeout(() => {
    run();
  }, 5);
}

run();
