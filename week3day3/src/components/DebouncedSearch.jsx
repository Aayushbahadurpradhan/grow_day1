import { useState, useEffect } from 'react';
import { useDebounce } from '../hooks/useDebounce';

export default function DebouncedSearch() {
  const [input, setInput] = useState('');
  const debounced = useDebounce(input, 600);

  useEffect(() => {
    if (debounced) {
      console.log('API call triggered for:', debounced);
    }
  }, [debounced]);

  return (
    <div className="p-4 rounded shadow bg-red-400">
      <label className="block mb-2">Search:</label>
      <input
        type="text"
        className="w-full px-3 py-2 rounded border border-gray-300 text-black"
        placeholder="Type to search..."
        value={input}
        onChange={e => setInput(e.target.value)}
      />
      <p className="mt-2 text-sm text-gray-500 dark:text-white">Debounced value: {debounced}</p>
    </div>
  );
}
