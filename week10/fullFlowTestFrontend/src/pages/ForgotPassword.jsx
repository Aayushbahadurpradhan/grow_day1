import { useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    alert("Password reset email sent!");
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Forgot Password</h2>
      <input
        className="border p-2"
        placeholder="Enter email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <button className="bg-blue-500 text-white p-2 mt-2" onClick={handleSubmit}>
        Send Reset Link
      </button>
    </div>
  );
}
