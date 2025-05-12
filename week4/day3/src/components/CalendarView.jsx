import { format, getDay, parse, startOfWeek } from "date-fns";
import { useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import useStore from "../store/useStore";
import * as dateFns from "date-fns";

const locales = {
  "en-US": dateFns,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export default function CalendarView() {
  const {
    selectedDate,
    setSelectedDate,
    events,
    openModal,
    view,
    setView,
  } = useStore();

  useEffect(() => {
    if (
      !selectedDate ||
      !(selectedDate instanceof Date) ||
      isNaN(selectedDate)
    ) {
      setSelectedDate(new Date());
    }
  }, [selectedDate, setSelectedDate]);
  const formattedEvents = events.map((event) => ({
    id: event.id || Date.now(),
    title: event.title,
    start: new Date(event.start),
    end: new Date(event.end),
  }));
  console.log("Formatted events:", formattedEvents); // Debuging  output
  const formatDateForInput = (date) => {
    if (!date || !(date instanceof Date) || isNaN(date)) {
      return "";
    }
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  return (
    <div className="p-4 border rounded">
      <h2 className="text-xl font-semibold mb-2">Calendar ({view})</h2>
      <div className="flex items-center gap-4 mb-4">
        <button
          onClick={openModal}
          className="px-3 py-1 bg-green-500 text-white rounded"
        >
          ➕ Add Event
        </button>
        <input
          type="date"
          value={formatDateForInput(selectedDate)}
          onChange={(e) => {
            const newDate = new Date(e.target.value);
            setSelectedDate(newDate);
          }}
          className="border px-2 py-1 rounded"
        />
      </div>
      <Calendar
        localizer={localizer}
        events={formattedEvents}
        startAccessor="start"
        endAccessor="end"
        view={view}
        onView={setView} 
        onNavigate={setSelectedDate} 
        style={{ height: 700 }}
        selectable
      />
    </div>
  );
}
