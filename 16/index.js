function loop(sequence, pattern, times) {
  let current = sequence;
  for (let i = 0; i < times; i++) {
    console.log('loop', i);
    current = process(current, pattern);
  }
  return current;
}

function process(sequence, pattern) {
  return sequence.reduce((acc, item, element) => {
    const output = process_element(sequence, pattern, element);
    return [ ...acc, output ];
  }, []).map(item => Math.abs(item) % 10);
}

function process_element(sequence, pattern, element) {
  const items = inner_repeat(pattern, element + 1);
  return sequence.reduce((acc, item, index) => {
    return acc + item * get_item(items, index);
  }, 0);
}

function get_item(items, pos) {
  const index = (pos + 1) % items.length;
  return items[index];
}

function inner_repeat(items, times) {
  return items.reduce((acc, item) => {
    const items = new Array(times).fill(item);
    return [...acc, ...items];
  }, []);
}

module.exports = { loop, process };
