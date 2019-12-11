function process(input) {
  const positions = parse(input);
  const stats = count(positions);
  return stats.sort((a, b) => { return b.count - a.count });
}

function parse(input) {
  const output = [];
  const lines = input.split('\n');
  for (let y = 0; y < lines.length; y++) {
    const line = lines[y];
    for (let x = 0; x < line.length; x++) {
      const point = line[x];
      if (point !== '.') {
        output.push({ x, y });
      }
    }
  }
  return output;
}

function count(points) {
  return points.map((point) => {
    const asteroids = points.filter(p => p !== point);
    const detected = {};
    for (let asteroid of asteroids) {
      const degrees = get_degrees(point, asteroid);
      const distance = Math.abs(asteroid.x - point.x) + Math.abs(asteroid.y - point.y);
      const data = { ...asteroid, degrees, distance };
      const previous = detected[degrees] || [];
      detected[degrees] = [...previous, data];
    }
    const count = Object.values(detected).length;
    return { ...point, detected, count };
  });
}

function get_degrees(a, b) {
  const y = (b.y - a.y) * -1;
  const x = b.x - a.x;
  const radians = Math.atan2(y, x);
  const degrees = radians * 180 / Math.PI;
  return (360 - degrees + 90) % 360;
}

module.exports = { process, parse, count };
