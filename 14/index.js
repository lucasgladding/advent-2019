const { parse } = require('./parse');
const { flatten } = require('./helpers');
const { Storage } = require('./storage');

function create(string) {
  const storage = new Storage();
  const reactions = parse(string);
  for (let item of reactions) {
    storage.set(item.output.name, item);
  }
  return storage;
}

function measure(source) {
  return flatten(source).reduce((count, item) => {
    return count + item.units;
  }, 0);
}

module.exports = { create, measure };
