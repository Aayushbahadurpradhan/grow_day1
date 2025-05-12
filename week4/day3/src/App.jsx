import React from "react";
import TaskList from "./components/TaskList";
import CalendarView from "./components/CalendarView";

export default function App() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Zustand Calendar App</h1>
      <div className="grid gap-4 mt-4">
        <CalendarView />
        <TaskList />
      </div>
    </div>
  );
}
