
export default function StepPersonal({ state, dispatch }) {
  return (
    <div className="space-y-2">
      <input
        className="w-full p-2 border rounded"
        placeholder="Name"
        value={state.name}
        onChange={(e) => dispatch({ field: "name", value: e.target.value })}
      />
      <input
        className="w-full p-2 border rounded"
        placeholder="Email"
        value={state.email}
        onChange={(e) => dispatch({ field: "email", value: e.target.value })}
      />
      <input
        className="w-full p-2 border rounded"
        type="password"
        placeholder="Password"
        value={state.password}
        onChange={(e) => dispatch({field:"password", value:e.target.value})}
      />
    </div>
  );
}
