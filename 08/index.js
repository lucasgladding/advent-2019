function sum(input, dim) {
  const tree = build(input, dim);
  const flat = tree.map(item => flatten(item));
  const stats = flat.map((layer) => {
    const equals_0 = layer.filter(item => item === 0).length;
    const equals_1 = layer.filter(item => item === 1).length;
    const equals_2 = layer.filter(item => item === 2).length;
    return { equals_0, equals_1, equals_2 };
  });
  const sorted = stats.sort((a, b) => (a.equals_0 - b.equals_0));
  const match = sorted[0];
  return match.equals_1 * match.equals_2;
}

function build(input, dim) {
  const size = dim.w * dim.h;
  const layers = chunk(input, size);
  return layers.map((layer) => {
    const rows = chunk(layer, dim.w);
    return rows.map((row) => {
      const pixels = row.split('');
      return pixels.map(pixel => parseInt(pixel));
    });
  })
}

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

function flatten(input) {
  return input.reduce((output, item) => {
    if (Array.isArray(item)) {
      const tacos = flatten(item);
      return output.concat(tacos);
    }
    return [...output, item];
  }, []);
}

module.exports = { sum, build, flatten };
