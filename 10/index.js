function process(input) {
  const points = parse(input);
  const stats = detect(points);
  return stats.sort((a, b) => { return b.detected - a.detected });
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

function detect(points) {
  return points.map((point) => detect_point(points, point));
}

function detect_point(points, point) {
  const targets = points.filter(p => p !== point);
  const directions = {};
  for (let target of targets) {
    const degrees = get_degrees(point, target);
    const distance = Math.abs(target.x - point.x) + Math.abs(target.y - point.y);
    const data = { ...target, degrees, distance };
    const previous = directions[degrees] || [];
    directions[degrees] = [...previous, data];
  }
  const detected = Object.values(directions).length;
  return { ...point, directions, detected };
}

function get_degrees(a, b) {
  const y = (b.y - a.y) * -1;
  const x = b.x - a.x;
  const radians = Math.atan2(y, x);
  const degrees = radians * 180 / Math.PI;
  return (360 - degrees + 90) % 360;
}

module.exports = { process };
