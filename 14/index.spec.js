const { create, measure } = require('./index');

const example_1 = require('./example-1.txt');

describe('14', () => {
  it('example 1', () => {
    const storage = create(example_1);
    const item = storage.get('FUEL');
    const source = item.source(storage);
    const units = measure(source);
    console.log('item', units);
  });
});
