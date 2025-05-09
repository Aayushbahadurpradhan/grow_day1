import { useReducer } from "react";
import { formReducer, initialState } from "../reducers/formReducer";
export default function ReducerForm() {
  const [state, dispatch] = useReducer(formReducer, initialState);
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Reducer form submitted: " + JSON.stringify(state));
    dispatch({ type: "RESET" });
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-4 border rounded-xl space-y-4"
    >
      <h2 className="text-xl font-semibold">Reducer Form</h2>
      {["name", "email", "password"].map((field) => (
        <input
          key={field}
          className="w-full p-2 border rounded"
          placeholder={field}
          type={field === "password" ? "password" : "text"}
          value={state[field]}
          onChange={(e) =>
            dispatch({ type: "UPDATE_FIELD", field, value: e.target.value })
          }
        />
      ))}
      <button className="px-4 py-2 bg-green-500 text-white rounded">
        Submit
      </button>
    </form>
  );
}
