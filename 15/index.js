const { Grid } = require('./grid');
const { Space, Wall } = require('./nodes');
const { Program } = require('./program');
const { render } = require('./render');
const { Robot } = require('./robot');

const input = require('./input');

//

let stage = 0;
let maximum = 0;

const grid = new Grid();
const robot = new Robot();

let current = new Space(0);
let found;

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
    const distance = current.distance + 1;
    if (distance > maximum) {
      maximum = distance;
    }

    console.log('MOVED', distance);

    const node = current.directions[direction] || new Space(distance);
    current.set_space(direction, node);
    current = node;

    grid.set(target.x, target.y, '.');
    robot.move(direction);
  }
  if (value === 2) {
    found = current;

    if (stage === 0) {
      console.log('FOUND', found.distance);
      stage = 1;
      maximum = 0;
      grid.clear();
      current.clear();
    }

    if (stage === 1) {
      console.log('MAXIMUM', maximum);
    }

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
  if (!direction) {
    return;
  }

  const input = get_input(direction);
  program.run(input);

  setTimeout(() => run(), 20);
}

run();
