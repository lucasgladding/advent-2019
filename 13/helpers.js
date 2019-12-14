function chunk(input, size) {
  const output = [];
  let i = 0;
  while (i < input.length) {
    const segment = input.slice(i, i + size);
    output.push(segment);
    i += size;
  }
  return output;
}

module.exports = { chunk };
