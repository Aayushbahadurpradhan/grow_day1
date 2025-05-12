import React from "react";
import { useTaskStore } from "../store/useStore";
import { shallow } from "zustand/shallow";

export default function TaskList() {
  const tasks = useTaskStore((state) => state.tasks, shallow);
  const addTask = useTaskStore((state) => state.addTask);
  const toggleTask = useTaskStore((state) => state.toggleTask);
  const deleteTask = useTaskStore((state) => state.deleteTask);
  const undo = useTaskStore((state) => state.undo);
  const redo = useTaskStore((state) => state.redo);

  const [text, setText] = React.useState("");

  return (
    <div className="p-4 border rounded">
      <h2 className="text-lg font-bold mb-2">Tasks</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (text.trim()) addTask(text);
          setText("");
        }}
        className="flex gap-2 mb-4"
      >
        <input
          className="border px-2 py-1 rounded"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="New Task"
        />
        <button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded">Add</button>
        <button type="button" onClick={undo} className="bg-yellow-400 text-white px-3 py-1 rounded">Undo</button>
        <button type="button" onClick={redo} className="bg-green-500 text-white px-3 py-1 rounded">Redo</button>
      </form>
      <ul className="space-y-2">
        {tasks.map((t) => (
          <li key={t.id} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={t.completed}
              onChange={() => toggleTask(t.id)}
            />
            <span className={t.completed ? "line-through" : ""}>{t.text}</span>
            <button onClick={() => deleteTask(t.id)} className="text-red-500">❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
