function process(input) {
  const points = parse(input);
  const detected = detect(points);
  return detected.sort((a, b) => (b.detected - a.detected));
}

function process_point(input, point) {
  const points = parse(input);
  return detect_point(points, point);
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
    directions[degrees] = [...previous, data].sort((a, b) => (a.distance - b.distance));
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

function vaporize(detected) {
  const directions = Object.keys(detected.directions).sort(compare_num);
  let i = 0;
  let count = 1;
  let vaporized = {};
  for (let j = 0; j < 500; j++) {
    const direction = directions[i];
    const data = vaporized[direction] || [];
    const target = detected.directions[direction][data.length];
    if (target) {
      vaporized[direction] = [...data, target];
      console.log('destroyed', { direction, target, count });
      count++;
    }
    i = (i + 1) % directions.length;
  }
}

function compare_num(a, b) {
  return parseFloat(a) - parseFloat(b);
}

module.exports = { process, process_point, vaporize };
