function flatten(input) {
  return input.reduce((output, item) => {
    if (Array.isArray(item)) {
      const tacos = flatten(item);
      return output.concat(tacos);
    }
    return [...output, item];
  }, []);
}

module.exports = { flatten };
