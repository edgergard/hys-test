export const convertDate = (timeZone: string) => {
  const currentDateTime = new Date();

  const timeString = currentDateTime.toLocaleString('en-US', {
    timeZone: timeZone,
  });

  const date = timeString.split(',')[0];
  const time = timeString.split(',')[1];

  return {date, time};
};

export const getDayOfWeek = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);

  const dayOfWeek = date.getDay();

  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  return days[dayOfWeek];
};
