import { create } from "zustand";
import { persist } from "zustand/middleware";
import { shallow } from "zustand/shallow";
const useStore = create(
  persist(
    (set, get) => ({
      tasks: [],
      events: [],
      history: [],
      future: [],
      selectedDate: new Date(),
      isModalOpen: false,
      view: "week",
      step: 1,
      totalSteps: 3,
      formData: {
        title: "",
        date: "",
        startTime: "09:00",
        endTime: "10:00",
      },
      validationErrors: {},
      addTask: (text) => {
        const task = { id: Date.now(), text, completed: false };
        set((state) => ({
          history: [...state.history, state.tasks],
          tasks: [...state.tasks, task],
          future: [],
        }));
      },
      toggleTask: (id) =>
        set((state) => ({
          history: [...state.history, state.tasks],
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, completed: !task.completed } : task
          ),
          future: [],
        })),
      deleteTask: (id) =>
        set((state) => ({
          history: [...state.history, state.tasks],
          tasks: state.tasks.filter((task) => task.id !== id),
          future: [],
        })),
      undo: () => {
        const { history, tasks, future } = get();
        if (history.length === 0) return;
        const previous = history[history.length - 1];
        set({
          tasks: previous,
          history: history.slice(0, -1),
          future: [tasks, ...future],
        });
      },
      redo: () => {
        const { future, tasks, history } = get();
        if (future.length === 0) return;
        const next = future[0];
        set({
          tasks: next,
          history: [...history, tasks],
          future: future.slice(1),
        });
      },
      addEvent: (event) =>
        set((state) => ({
          events: [...state.events, { ...event, id: Date.now() }],
        })),
      removeEvent: (id) =>
        set((state) => ({
          events: state.events.filter((e) => e.id !== id),
        })),
      setSelectedDate: (date) => set({ selectedDate: date }),
      openModal: () => set({ isModalOpen: true }),
      closeModal: () => set({ isModalOpen: false }),
      setView: (newView) => set({ view: newView }),
      setStep: (step) => set({ step }),
      updateData: (data) =>
        set((state) => ({
          formData: { ...state.formData, ...data },
        })),
      setValidationErrors: (errors) => set({ validationErrors: errors }),
      resetForm: () =>
        set(() => ({
          formData: {
            title: "",
            date: "",
            startTime: "09:00",
            endTime: "10:00",
          },
          step: 1,
          validationErrors: {},
        })),
      reset: () =>
        set(() => ({
          tasks: [],
          history: [],
          future: [],
          events: [],
          selectedDate: new Date(),
          isModalOpen: false,
          view: "week",
          formData: {
            title: "",
            date: "",
            startTime: "09:00",
            endTime: "10:00",
          },
          step: 1,
          validationErrors: {},
        })),
    }),
    {
      name: "calendar-app-store",
      partialize: (state) => ({
        tasks: state.tasks,
        events: state.events,
        selectedDate: state.selectedDate,
        view: state.view,
      }),
    }
  )
);

export const useTaskStore = (selector) => useStore(selector, shallow);
export default useStore;
