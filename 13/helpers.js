function chunk(input, size) {
  const output = [];
  let i = 0;
  while (i < input.length) {
    const chunk = input.slice(i, i + size);
    output.push(chunk);
    i += size;
  }
  return output;
}

module.exports = { chunk };
