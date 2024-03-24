export const getCurrentDay = (): string => {
  // Get the current date
  const currentDate: Date = new Date();

  // Define options for formatting
  const options: Intl.DateTimeFormatOptions = { weekday: "long" };

  // Format the date to get the day of the week
  const currentDay: string = new Intl.DateTimeFormat("en-US", options).format(
    currentDate
  );

  return currentDay;
};
