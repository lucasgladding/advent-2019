const { parse_reactions } = require('./index');
const { Nanofactory } = require('./nanofactory');

const example_1 = require('./example-1.txt');
const example_2 = require('./example-2.txt');
const example_3 = require('./example-3.txt');
const example_4 = require('./example-4.txt');
const example_5 = require('./example-5.txt');
const input = require('./input.txt');

describe('14', () => {
  it('example 1', () => {
    const reactions = parse_reactions(example_1);
    const nanofactory = new Nanofactory(reactions);
    nanofactory.produce(1, 'FUEL');
    expect(nanofactory.mine).toEqual(31);
  });

  it('example 2', () => {
    const reactions = parse_reactions(example_2);
    const nanofactory = new Nanofactory(reactions);
    nanofactory.produce(1, 'FUEL');
    expect(nanofactory.mine).toEqual(165);
  });

  it('example 3', () => {
    const reactions = parse_reactions(example_3);
    const nanofactory = new Nanofactory(reactions);
    nanofactory.produce(1, 'FUEL');
    expect(nanofactory.mine).toEqual(13312);
  });

  it('example 4', () => {
    const reactions = parse_reactions(example_4);
    const nanofactory = new Nanofactory(reactions);
    nanofactory.produce(1, 'FUEL');
    expect(nanofactory.mine).toEqual(180697);
  });

  it('example 5', () => {
    const reactions = parse_reactions(example_5);
    const nanofactory = new Nanofactory(reactions);
    nanofactory.produce(1, 'FUEL');
    expect(nanofactory.mine).toEqual(2210736);
  });

  it('part 1', () => {
    const reactions = parse_reactions(input);
    const nanofactory = new Nanofactory(reactions);
    nanofactory.produce(1, 'FUEL');
    expect(nanofactory.mine).toEqual(1582325);
  });
});
