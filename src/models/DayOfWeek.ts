export enum DayOfWeek {
  Sunday = 'SUNDAY',
  Monday = 'MONDAY',
  Tuesday = 'TUESDAY',
  Wednesday = 'WEDNESDAY',
  Thursday = 'THURSDAY',
  Friday = 'FRIDAY',
  Saturday = 'SATURDAY',
}

export const getDayIndex = (dayOfWeek: DayOfWeek) => {
  switch (dayOfWeek) {
    case DayOfWeek.Sunday:
      return 0;
    case DayOfWeek.Monday:
      return 1;
    case DayOfWeek.Tuesday:
      return 2;
    case DayOfWeek.Wednesday:
      return 3;
    case DayOfWeek.Thursday:
      return 4;
    case DayOfWeek.Friday:
      return 5;
    case DayOfWeek.Saturday:
      return 6;
  }
};
