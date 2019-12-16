function approximate(a, b, success) {
  a = Math.round(a);
  b = Math.round(b);
  const length = (b - a) / 2;

  const min = success(a);
  const mid = success(a + length);
  const max = success(b);

  if (length < 1) {
    return max ? b : a;
  }
  if (min && !mid) {
    return approximate(a, a + length, success);
  }
  if (mid && !max) {
    return approximate(a + length, b, success);
  }
}

module.exports = { approximate };
