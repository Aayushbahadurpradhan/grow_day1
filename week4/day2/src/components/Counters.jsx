import { useState } from "react";

function Counter({ count, onIncrement }) {
  return (
    <div className="flex items-center gap-2">
      <p className="text-lg">Count: {count}</p>
      <button
        onClick={onIncrement}
        className="px-2 py-1 bg-purple-500 text-white rounded"
      >
        +1
      </button>
    </div>
  );
}

export default function Counters() {
  const [count, setCount] = useState(0);
  const increment = () => setCount((c) => c + 1);

  return (
    <div className="max-w-md mx-auto p-4 border rounded-xl space-y-4">
      <h2 className="text-xl font-semibold">Lifted State Counters</h2>
      <Counter count={count} onIncrement={increment} />
      <Counter count={count} onIncrement={increment} />
    </div>
  );
}
