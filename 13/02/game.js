import { Grid } from './grid.js';
import { Program } from './program.js';
import input from './input.js';

export class Game {
  constructor() {
    this.program = new Program(input, this.receive);
    this.grid = new Grid();
    this.outputs = [];
    this.target = 0;
    this.current = 0;
  }

  run(input = null) {
    // cheats
    input = 0;
    if (this.target < this.current) {
      input = -1;
    }
    if (this.target > this.current) {
      input = +1;
    }

    this.program.run(input);
  }

  receive = (value) => {
    this.outputs.push(value);
    if (this.outputs.length === 3) {
      const [ x, y, id ] = this.outputs;
      this.grid.set(x, y, id);
      this.outputs = [];
    }
  };

  score() {
    return this.grid.get(-1, 0);
  }

  print() {
    let output = '';
    for (let y = 0; y < 25; y++) {
      for (let x = 0; x <= 40; x++) {
        const id = this.grid.get(x, y);

        // cheats
        if (id === 3) {
          this.current = x;
        }
        if (id === 4) {
          this.target = x;
        }

        output += this.transform(id);
      }
      output += '<br>';
    }
    return output;
  }

  transform(id) {
    const map = ['space', 'wall', 'block', 'paddle', 'ball'];
    const name = map[id];
    return `<span class="icon ${name}"></span>`;
  }
}
