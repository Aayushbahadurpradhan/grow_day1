import React, { useEffect } from 'react';
import { shallow } from 'zustand/shallow';
import useStore from '../slices/store';
const CountDisplay = React.memo(() => {
  const count = useStore((state) => state.count);
  console.log('🔁 CountDisplay render');
  return <div>Count: {count}</div>;
});
const OtherComponent = React.memo(() => {
  const { modalOpen, theme } = useStore(
    (state) => ({ modalOpen: state.modalOpen, theme: state.theme }),
    shallow
  );
  console.log('OtherComponent render');
  return (
    <div>
      <p>Modal: {modalOpen ? 'Open' : 'Closed'}</p>
      <p>Theme: {theme}</p>
    </div>
  );
});
const CountControl = () => {
  const increase = useStore((state) => state.increase);
  return (
    <button onClick={increase} className="px-4 py-2 bg-blue-500 text-white rounded">
      Increase
    </button>
  );
};
export default function PerformanceTest() {
  const count = useStore((state) => state.count);
  const set = useStore.setState;
  useEffect(() => {
    const store = useStore.getState();
    if (typeof store.increase !== 'function') {
      set((s) => ({
        count: s.count ?? 0,
        increase: () => useStore.setState((s) => ({ count: s.count + 1 })),
        theme: s.theme ?? 'light',
        modalOpen: s.modalOpen ?? false,
        toggleModal: () => useStore.setState((s) => ({ modalOpen: !s.modalOpen })),
      }));
    }
    const interval = setInterval(() => {
      const { count, increase } = useStore.getState();
      if (count < 10 && typeof increase === 'function') {
        increase();
      } else {
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [set]);
  return (
    <div className="my-6 p-4 border rounded-xl bg-white dark:bg-gray-800 text-black dark:text-white">
      <h2 className="text-xl font-bold mb-2">Zustand Performance Test</h2>
      <p className="mb-2">Current count (parent read): {count}</p>
      <CountDisplay />
      <CountControl />
      <OtherComponent />
    </div>
  );
}
