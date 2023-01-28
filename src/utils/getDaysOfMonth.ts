import dayjs from "dayjs";

export function getDaysOfMonth(month: dayjs.Dayjs) {
  const days = [];

  const firstDayOfMonth = month.startOf("M");
  const lastDayOfMonth = month.endOf("M");

  let compareDate = firstDayOfMonth;

  while (compareDate.isBefore(lastDayOfMonth)) {
    days.push(compareDate);
    compareDate = compareDate.add(1, "day");
  }

  return days;
}
