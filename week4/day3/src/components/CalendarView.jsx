import { format, getDay, parse, startOfWeek } from "date-fns";
import { useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import useStore from "../store/useStore";
import * as dateFns from "date-fns";
import EventModal from "./EventModal"; 

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
    isModalOpen,
  } = useStore();

  useEffect(() => {
    if (!selectedDate || !(selectedDate instanceof Date) || isNaN(selectedDate)) {
      setSelectedDate(new Date());
    }
  }, [selectedDate, setSelectedDate]);

  const handleNavigate = (newDate) => {
    setSelectedDate(newDate);
  };

  const formattedEvents = events.map((event) => ({
    id: event.id || Date.now(),
    title: event.title,
    start: new Date(event.start),
    end: new Date(event.end),
  }));

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
      </div>
      <Calendar
        localizer={localizer}
        events={formattedEvents}
        startAccessor="start"
        endAccessor="end"
        view={view}
        onView={setView}
        onNavigate={handleNavigate} 
        style={{ height: 700 }}
        selectable
      />

      {isModalOpen && <EventModal />}
    </div>
  );
}
