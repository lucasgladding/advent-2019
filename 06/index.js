class Graph {
  constructor(input) {
    this.input = input;
    this.graph = this.build();
  }

  build() {
    const map = {};
    for (let item of this.data) {
      const b = map[item.b] || { name: item.b, nodes: [] };
      const a = map[item.a] || { name: item.a, nodes: [] };
      b.parent = a;
      a.nodes.push(b);
      map[a.name] = a;
      map[b.name] = b;
    }
    return map;
  }

  get data() {
    const lines = this.input.split('\n')
      .filter(line => line);
    return lines.map(this.parse);
  }

  parse(description) {
    const [parent, child] = description.split(')');
    return { a: parent, b: child };
  }

  count(name) {
    return this.path(name).length - 1;
  }

  path(name) {
    const path = [];
    let target = this.graph[name];
    do {
      path.push(target.name);
      target = target.parent;
    } while (target);
    return path.reverse();
  }

  get sum() {
    let sum = 0;
    for (let name in this.graph) {
      sum += this.count(name);
    }
    return sum;
  }

  transfers(a, b) {
    const count_a = this.count(a);
    const count_b = this.count(b);
    const intersect = this.intersect(a, b).length;
    return count_a - intersect + count_b - intersect;
  }

  intersect(a, b) {
    const path_a = this.path(a);
    const path_b = this.path(b);
    return path_a.filter((item) => {
      return path_b.includes(item);
    });
  }
}

module.exports = { Graph };
