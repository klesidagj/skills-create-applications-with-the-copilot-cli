const { add, sub, mul, div } = require('../calculator');

describe('Calculator functions', () => {
  test('addition: 2 + 3 = 5', () => {
    expect(add(2, 3)).toBe(5);
  });

  test('subtraction: 10 - 4 = 6', () => {
    expect(sub(10, 4)).toBe(6);
  });

  test('multiplication: 45 * 2 = 90', () => {
    expect(mul(45, 2)).toBe(90);
  });

  test('division: 20 / 5 = 4', () => {
    expect(div(20, 5)).toBe(4);
  });

  test('division by zero throws error', () => {
    expect(() => div(1, 0)).toThrow(/division by zero/);
  });

  test('works with numeric strings', () => {
    expect(add('2', '3')).toBe(5);
    expect(sub('10', '4')).toBe(6);
    expect(mul('3', '7')).toBe(21);
    expect(div('9', '3')).toBe(3);
  });

  test('handles negative numbers and floats', () => {
    expect(add(-1, 1)).toBe(0);
    expect(sub(5.5, 2.2)).toBeCloseTo(3.3);
    expect(mul(-2, 3)).toBe(-6);
    expect(div(7, 2)).toBe(3.5);
  });
});
