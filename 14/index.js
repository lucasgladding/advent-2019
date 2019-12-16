const { parse } = require('./parse');
const { Storage } = require('./storage');

function parse_reactions(string) {
  const storage = new Storage();
  const reactions = parse(string);
  for (let item of reactions) {
    storage.set(item.output.name, item);
  }
  return storage;
}

module.exports = { parse_reactions };
