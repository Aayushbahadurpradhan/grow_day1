export default function StepConfirm({ state }) {
  return (
    <ul className="space-y-1">
      {Object.entries(state).map(([k, v]) => (
        <li key={k}>
          <strong>{k}:</strong> {v}
        </li>
      ))}
    </ul>
  );
}
