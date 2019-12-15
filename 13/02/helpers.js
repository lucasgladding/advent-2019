export function chunk(input, size) {
  let i = 0;
  const output = [];
  while (i < input.length) {
    const segment = input.slice(i, i + size);
    output.push(segment);
    i += size;
  }
  return output;
}
