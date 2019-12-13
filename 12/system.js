const { Position, Velocity } = require('./moon');

class System {
  constructor(moons) {
    this.moons = moons;
  }

  step() {
    const list = this.moons.map((moon, index) => {
      const moons = [
        ...this.moons.slice(0, index),
        ...this.moons.slice(index + 1),
      ];
      return moons.map((m) => this.change(moon, m));
    });
    this.moons.map((moon, index) => {
      const changes = list[index];
      moon.apply(changes);
      moon.step();
    });
  }

  change(a, b) {
    const x = this.dimension(a.position.x, b.position.x);
    const y = this.dimension(a.position.y, b.position.y);
    const z = this.dimension(a.position.z, b.position.z);
    return new Velocity(x, y, z);
  }

  dimension(a, b) {
    if (b > a) {
      return +1;
    }
    if (b < a) {
      return -1;
    }
    return 0;
  }

  energy() {
    return this.moons.reduce((acc, moon) => {
      return acc + moon.energy();
    }, 0);
  }

  count_steps(targets, limit = 1000000000000) {
    for (let i = 1; i <= limit; i++) {
      this.step();
      if (this.equals(targets)) {
        return i;
      }
    }
    return -1;
  }

  equals(targets) {
    return this.moons.every((moon, index) => {
      return moon.equals(targets[index]);
    });
  }
}

module.exports = { System };
