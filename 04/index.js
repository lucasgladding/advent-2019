// It is a six-digit number.
// The value is within the range given in your puzzle input.
// Two adjacent digits are the same (like 22 in 122345).
// Going from left to right, the digits never decrease; they only ever increase or stay the same (like 111123 or 135679).

class Test {
  test(input) {
    input = input.toString();
    if (!this.hasLength(input)) {
      return false;
    }
    if (!this.digitsAreEqual(input)) {
      return false;
    }
    if (!this.digitsDontDecrease(input)) {
      return false;
    }
    return true;
  }

  hasLength(input) {
    return input.length === 6;
  }

  digitsAreEqual(input) {
    for (let i = 0; i < input.length - 1; i++) {
      const a = input[i - 1];
      const b = input[i];
      const c = input[i + 1];
      const d = input[i + 2];
      if (b == c && a != b && c != d) {
        return true;
      }
    }
    return false;
  }

  digitsDontDecrease(input) {
    for (let i = 0; i < input.length - 1; i++) {
      const a = input[i];
      const b = input[i + 1];
      if (b < a) {
        return false;
      }
    }
    return true;
  }
}

module.exports = { Test };
