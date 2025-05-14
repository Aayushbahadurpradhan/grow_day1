import { useReducer, useState } from "react";
import useBoundStore from "../slices/store"; 
import StepAddress from "./StepAddress";
import StepConfirm from "./StepConfirm";
import StepPersonal from "./StepPersonal";

const initial = {
  name: "",
  email: "",
  city: "",
  country: "",
  password: "",
};

function reducer(state, action) {
  return { ...state, [action.field]: action.value };
}
export default function MultiStepForm({ onClose }) {
  const [step, setStep] = useState(0);
  const [state, dispatch] = useReducer(reducer, initial);
  const login = useBoundStore((s) => s.login);
  const register = useBoundStore((s) => s.register);

  const next = () => setStep((s) => s + 1);
  const prev = () => setStep((s) => s - 1);

  const steps = [
    <StepPersonal
      key="1"
      state={state}
      dispatch={dispatch}
      register={register}
    />,
    <StepAddress key="2" state={state} dispatch={dispatch} />,
    <StepConfirm key="3" state={state} login={login} />,
  ];

  const handleSubmit = () => {
    register({
      id: Date.now(),
      ...state,
    });
    login(state.email, state.password);
    alert("Form Submitted & Logged In: " + JSON.stringify(state));
    if (onClose) onClose();
  };

  return (
    <div className="max-w-md mx-auto border p-4 rounded-xl space-y-4 bg-white text-black">
      <h2 className="text-xl font-semibold">Multi Step Form</h2>
      {steps[step]}
      <div className="flex justify-between">
        {step > 0 && (
          <button onClick={prev} className="px-4 py-2 bg-gray-300 rounded">
            Back
          </button>
        )}
        {step < 2 ? (
          <button
            onClick={next}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
}
