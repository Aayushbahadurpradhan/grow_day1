import React, { useState } from "react";
import useStore from "../store/useStore";

export default function EventModal() {
  const { closeModal, addEvent, selectedDate } = useStore();
  const [title, setTitle] = useState("");
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("10:00");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const startDateTime = new Date(selectedDate);
    const endDateTime = new Date(selectedDate);

    const [startHour, startMinute] = startTime.split(":");
    const [endHour, endMinute] = endTime.split(":");

    startDateTime.setHours(startHour, startMinute);
    endDateTime.setHours(endHour, endMinute);

    addEvent({ title, start: startDateTime, end: endDateTime });
    closeModal();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center">
      <form className="bg-white p-4 rounded" onSubmit={handleSubmit}>
        <h3>Add Event</h3>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Event Title"
        />
        <div className="flex gap-4 mt-2">
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </div>
        <button type="submit">Save</button>
        <button type="button" onClick={closeModal}>
          Cancel
        </button>
      </form>
    </div>
  );
}
