// Formats a JavaScript Date object to a string in 'YYYY-MM-DD' format.

export const formattedDateToAddNewEvent = (date) => {
  if (!date) return "";
  return date.toISOString().split("T")[0];
};

// Converts a date string in ISO format to a string in 'YYYY-MM-DD' format.
export const formattedDate = (date) => {
  if (!date) return "";
  return date.split("T")[0];
};
