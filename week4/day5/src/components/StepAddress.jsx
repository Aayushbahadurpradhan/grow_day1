export default function StepAddress({ state, dispatch }) {
  return (
    <div className="space-y-2">
      <input
        className="w-full p-2 border rounded"
        placeholder="City"
        value={state.city}
        onChange={(e) => dispatch({ field: "city", value: e.target.value })}
      />
      <input
        className="w-full p-2 border rounded"
        placeholder="Country"
        value={state.country}
        onChange={(e) => dispatch({ field: "country", value: e.target.value })}
      />
    </div>
  );
}
