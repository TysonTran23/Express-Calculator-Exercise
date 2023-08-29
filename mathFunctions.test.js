const { getMean, getMedian, getMode } = require("./app.js");

describe('getMean', () => {
  test('calculate mean', () => {
    expect(getMean([1, 2, 3, 4, 5])).toBe(3);
    expect(getMean([1, 1, 1, 1])).toBe(1);
    expect(getMean([1, 2, 3, 4, 100])).toBe(22);
  });
});

describe('getMedian', () => {
  test('calculate median', () => {
    expect(getMedian([1, 2, 3, 4, 5])).toBe(3);
    expect(getMedian([1, 1, 1, 1])).toBe(1);
    expect(getMedian([1, 2, 100])).toBe(2);
    expect(getMedian([1, 2, 3, 4])).toBe(2.5);
  });
});

describe('getMode', () => {
  test('calculate mode', () => {
    expect(getMode([1, 2, 2, 2, 3])).toEqual([2]);
    expect(getMode([1, 1, 1, 2, 2, 2, 3])).toEqual([1, 2]); // multiple modes
    expect(getMode([1, 2, 3])).toEqual([1, 2, 3]); // no repeating numbers
  });
});
