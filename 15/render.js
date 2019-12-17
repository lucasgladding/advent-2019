const size = 30;

function render(grid, robot) {
  let output = '';
  for (let y = size; y > -size; y--) {
    for (let x = -size; x < size; x++) {
      if (robot.current(x, y)) {
        output += 'D';
      } else {
        output += grid.get(x, y);
      }
    }
    output += '\n';
  }
  console.log(output);
}

module.exports = { render };
