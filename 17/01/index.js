function sum(input) {
  let sum = 0;
  for (let line = 0; line < input.length; line++) {
    const data = input[line];
    for (let pos = 0; pos < data.length; pos++) {
      if (has(input, line, pos)) {
        if (intersection(input, line, pos)) {
          sum += line * pos;
        }
      }
    }
  }
  return sum;
}

function intersection(input, line, pos) {
  return has(input, line - 1, pos) && has(input, line + 1, pos) && has(input, line, pos - 1) && has(input, line, pos + 1);
}

function has(input, line, pos) {
  const value = get(input, line, pos);
  return value && value !== '.';
}

function get(input, line, pos) {
  const data = input[line] || '';
  return data[pos];
}

module.exports = { sum };
