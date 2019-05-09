export function renderDate(date) {
  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false
  };
  const data = new Date(date);
  return data.toLocaleString("en-US", options);
}
