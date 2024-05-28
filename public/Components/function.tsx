export const formatDateString = (utcDateString: string): string => {
  if (!utcDateString) return "";
  const utcDate = new Date(utcDateString);
  const month = utcDate.getUTCMonth() + 1;
  const year = utcDate.getUTCFullYear();
  const day = utcDate.getUTCDate();

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthName = monthNames[month - 1];

  const formattedDate = `${monthName} ${day}, ${year}`;

  return formattedDate;
};
