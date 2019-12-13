const { Moon } = require('./moon');
const { System } = require('./system');

describe('12', () => {
  it('example 1', () => {
    const moons = [
      new Moon(-1, 0, 2),
      new Moon(2, -10, -7),
      new Moon(4, -8, 8),
      new Moon(3, 5, -1),
    ];
    const system = new System(moons);
    for (let i = 0; i < 10; i++) {
      system.step();
    }
    expect(system.energy()).toEqual(179);
  });

  it('example 2', () => {
    const moons = [
      new Moon(-8, -10, 0),
      new Moon(5, 5, 10),
      new Moon(2, -7, 3),
      new Moon(9, -8, -3),
    ];
    const system = new System(moons);
    for (let i = 0; i < 100; i++) {
      system.step();
    }
    expect(system.energy()).toEqual(1940);
  });

  it('part 1', () => {
    const moons = [
      new Moon(4, 1, 1),
      new Moon(11, -18, -1),
      new Moon(-2, -10, -4),
      new Moon(-7, -2, 14),
    ];
    const system = new System(moons);
    for (let i = 0; i < 1000; i++) {
      system.step();
    }
    expect(system.energy()).toEqual(9493);
  });
});
