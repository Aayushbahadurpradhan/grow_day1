import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from './counterSlice';

export default function Counter() {
  const count = useSelector(state => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div className="p-4 text-center">
      <h2 className="text-xl font-bold">Counter: {count}</h2>
      <div className="space-x-4 mt-4">
        <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={() => dispatch(increment())}>+</button>
        <button className="px-4 py-2 bg-red-500 text-white rounded" onClick={() => dispatch(decrement())}>-</button>
      </div>
    </div>
  );
}
