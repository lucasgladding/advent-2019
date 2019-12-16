const clear = require('clear');
const inquirer = require('inquirer');

const { Grid } = require('./grid');
const { Program } = require('./program');
const { render } = require('./render');
const { Robot, Direction } = require('./robot');
const input = require('./input');

//

const questions = [
  {
    type: 'input',
    name: 'direction',
    message: 'Which direction?',
    choices: ['n', 's', 'w', 'e'],
  },
];

let target_direction = 0;

//

const grid = new Grid();
const robot = new Robot();

function output(value) {
  clear();
  const location = robot.target(target_direction);
  if (value === 0) {
    grid.set(location.x, location.y, '#');
  }
  if (value > 0) {
    grid.set(location.x, location.y, '.');
    robot.move(target_direction);
  }
  if (value === 2) {
    console.log('Reached the oxygen system!');
  }
  const output = render(grid, robot);
  console.log(output);
}

const program = new Program(input, output);
program.run();
grid.set(0, 0, '.');

function run() {
  inquirer.prompt(questions)
    .then((answers) => {
      const input = answers.direction.toUpperCase();
      target_direction = Direction[input];
      program.run(target_direction);
      run();
    });
}

run();
