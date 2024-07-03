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
