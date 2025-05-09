import { useState } from "react";
export default function ControlledForm() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const validate = () => {
    const errs = {};
    if (!form.name) errs.name = "Name is required";
    if (!form.email.includes("@")) errs.email = "Email is invalid";
    if (form.password.length < 6) errs.password = "Min 6 chars required";
    return errs;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length === 0) {
      alert("Submitted: " + JSON.stringify(form));
    } else {
      setErrors(errs);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-4 border rounded-xl space-y-4"
    >
      <h2 className="text-xl font-semibold">Controlled Form</h2>
      {["name", "email", "password"].map((key) => (
        <div key={key}>
          <input
            className="w-full p-2 border rounded"
            type={key === "password" ? "password" : "text"}
            placeholder={key}
            value={form[key]}
            onChange={(e) => setForm({ ...form, [key]: e.target.value })}
          />
          {errors[key] && <p className="text-red-500 text-sm">{errors[key]}</p>}
        </div>
      ))}
      <button className="px-4 py-2 bg-blue-500 text-white rounded">
        Submit
      </button>
    </form>
  );
}
