const { Chemical } = require('./chemical');
const { Reaction } = require('./reaction');

function parse(string) {
  const lines = string.split('\n');
  return lines.filter(line => line).map(parse_line);
}

function parse_line(string) {
  const [input_string, output_string] = string.split(' => ');
  const input = input_string.split(', ').map(parse_chem);
  const output = parse_chem(output_string);
  return new Reaction(input, output);
}

function parse_chem(string) {
  const components = string.split(' ');
  const units = parseInt(components[0]);
  const name = components[1];
  return new Chemical(units, name);
}

module.exports = { parse };
