import PropTypes from 'prop-types';

export default function Counter({ count, onIncrement, onDecrement }) {
  return (
    <div>
      <button onClick={onDecrement}>-</button>
      <span style={{ margin: '0 10px' }}>{count}</span>
      <button onClick={onIncrement}>+</button>
    </div>
  );
}

Counter.propTypes = {
  count: PropTypes.number.isRequired,
  onIncrement: PropTypes.func.isRequired,
  onDecrement: PropTypes.func.isRequired,
};
