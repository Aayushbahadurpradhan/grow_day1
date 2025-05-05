import { useState } from 'react';
import { usePrevious } from '../hooks/usePrevious';

export default function PreviousValueDemo() {
  const [count, setCount] = useState(0);
  const prevCount = usePrevious(count);

  return (
    <div className="bg-orange-400 p-4 rounded shadow transition-colors duration-300">
      
      <p className="mb-2">Previous: <span className="font-bold">{prevCount ?? 'N/A'}</span></p>
      <p className="mb-2">Current: <span className="font-bold">{count}</span></p>

      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded mt-2 transition-colors duration-200"
        onClick={() => setCount(c => c + 1)}
      >
        Increment
      </button>
    </div>
  );
}
