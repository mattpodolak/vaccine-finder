export const relativeHours = (hours = 36) => {
  const msSinceEpoch = new Date().getTime();
  return new Date(msSinceEpoch - hours * 60 * 60 * 1000);
};
