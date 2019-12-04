function calculate(mass) {
  const fuel = Math.floor(mass / 3) - 2;
  if (fuel > 0) {
    return fuel + calculate(fuel);
  }
  if (fuel < 0) {
    return 0;
  }
  return fuel;
}

function sum(input) {
  const masses = input.split('\n').filter(mass => !!mass);
  return masses.reduce((acc, mass) => {
    return acc + calculate(mass);
  }, 0);
}

module.exports = {
  calculate,
  sum,
};
