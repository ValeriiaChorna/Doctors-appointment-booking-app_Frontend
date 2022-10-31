export default function getTimeStringFromDate(dateValue: Date): string {
  const date = new Date(dateValue);
  let hours = date.getHours().toString();
  if (hours.length < 2) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes().toString();
  if (minutes.length < 2) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}
