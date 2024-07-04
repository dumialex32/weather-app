export function formatDate(date) {
  const newDate = new Date(date);
  return new Intl.DateTimeFormat("en-EN", {
    weekday: "long",
    month: "numeric",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(newDate);
}

export function convertDateToWeekday(dateStr) {
  console.log(dateStr);
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat("en-EN", {
    weekday: "long",
  }).format(date);
}

export function convertDateToHour(dateStr) {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat("en-EN", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}
