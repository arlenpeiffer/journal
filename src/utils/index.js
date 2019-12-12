export const formatSleepAmount = value => {
  const numberOfHours = Math.floor(value);
  const numberOfMinutes = (value - numberOfHours) * 60;
  const s = numberOfHours > 1 ? 's' : '';
  const hours = numberOfHours ? `${numberOfHours} hr${s}` : '';
  const minutes = `${numberOfMinutes} mins`;
  return `${hours} ${minutes}`;
};
