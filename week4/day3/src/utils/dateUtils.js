import { isSameDay, startOfWeek, endOfWeek, isWithinInterval, format } from "date-fns";

export const getEventsForDate = (events, date) =>
  events.filter((e) => isSameDay(new Date(e.date), date));

export const getEventsForWeek = (events, date) =>
  events.filter((e) =>
    isWithinInterval(new Date(e.date), {
      start: startOfWeek(date),
      end: endOfWeek(date),
    })
  );

export const formatEventDate = (date) => {
  return format(new Date(date), "yyyy-MM-dd");
};
