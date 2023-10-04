export const GetTimeStampInHours = (timestamp?: number) => {
  if (timestamp === undefined) return NaN;
  if (timestamp <= 0) return 0;
  return Math.round(timestamp / 60);
};
