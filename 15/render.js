function render(grid, robot) {
  let output = '';
  for (let y = 20; y > -20; y--) {
    for (let x = -20; x < 20; x++) {
      if (robot.is_here(x, y)) {
        output += 'D';
      } else {
        output += grid.get(x, y);
      }
    }
    output += '\n';
  }
  return output;
}

module.exports = { render };
