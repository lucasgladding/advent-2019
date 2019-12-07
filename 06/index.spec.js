const { Graph } = require('./index');
const input = require('./input.txt');
const input_part_1 = require('./input-part-1.txt');
const input_2 = require('./input-2.txt');

describe('06', () => {
  it('example 1', () => {
    const graph = new Graph(input);
    const count = graph.count('D');
    expect(count).toEqual(3);
  });

  it('D = 3', () => {
    const graph = new Graph(input);
    expect(graph.count('D')).toEqual(3);
  });

  it('L = 7', () => {
    const graph = new Graph(input);
    expect(graph.count('L')).toEqual(7);
  });

  it('42', () => {
    const graph = new Graph(input);
    expect(graph.sum).toEqual(42);
  });

  it('part 1', () => {
    const graph = new Graph(input_part_1);
    expect(graph.sum).toEqual(402879);
  });

  it('intersect', () => {
    const graph = new Graph(input_2);
    const intersect = graph.intersect('YOU', 'SAN');
    expect(intersect).toEqual(['COM', 'B', 'C', 'D']);
  });

  it('transfers', () => {
    const graph = new Graph(input_2);
    const transfers = graph.transfers('YOU', 'SAN');
    expect(transfers).toEqual(4);
  });

  it('part 2', () => {
    const graph = new Graph(input_part_1);
    const transfers = graph.transfers('YOU', 'SAN');
    expect(transfers).toEqual(484);
  });
});
