import { DateTime as Luxon } from 'luxon';

export function getCurrentHour(): number {
  const dTime: any = Luxon.now();
  return dTime.c.hour;
}

export function getCurrentWeekday(): string {
  const days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];
  return days[Luxon.now().weekday - 1];
};
