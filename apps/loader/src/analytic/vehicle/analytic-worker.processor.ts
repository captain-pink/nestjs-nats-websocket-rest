export function divideTestDigit(payload) {
  return Promise.resolve({
    timings: { start: 0, end: 0 },
    data: payload.dataframe / 2,
  });
}

export function findAvgSpeed(payload) {
  return Promise.resolve({
    timings: { start: 0, end: 0 },
    data: payload.dataframe / 2,
  });
}
