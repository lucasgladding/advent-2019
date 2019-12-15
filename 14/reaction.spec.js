const { Chemical } = require('./chemical');
const { Reaction } = require('./reaction');
const { Storage } = require('./storage');

describe('reaction', () => {
  it('gets source', () => {
    const reaction_c = new Reaction([new Chemical(6, 'A'), new Chemical(8, 'B')], new Chemical(1, 'C'));
    const reaction_a = new Reaction([new Chemical(4, 'ORE')], new Chemical(3, 'A'));
    const reaction_b = new Reaction([new Chemical(3, 'ORE')], new Chemical(2, 'B'));
    const storage = new Storage();
    storage.set('A', reaction_a);
    storage.set('B', reaction_b);
    storage.set('C', reaction_c);
    const source = reaction_c.source(storage, 2);
    expect(source).toEqual(20);
  });
});
