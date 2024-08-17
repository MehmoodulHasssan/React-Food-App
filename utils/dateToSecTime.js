export default function dateToSecTime(date) {
  const currentDate = new Date(date);
  const options = {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true, // 12-hour format
  };
  const time = currentDate.toLocaleString('en-US', options);
  return time;
}
