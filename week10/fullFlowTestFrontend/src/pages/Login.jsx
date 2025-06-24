import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login(email, pass);
    if (res.success) {
      setUser(res.user);
      navigate("/dashboard");
    } else {
      alert("Login failed");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto flex flex-col gap-2">
      <h2 className="text-xl font-bold">Login</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          className="border p-2"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="border p-2"
          type="password"
          placeholder="Password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />
        <button type="submit" className="bg-blue-500 text-white p-2">
          Login
        </button>
      </form>
      <a className="text-blue-700 underline mt-2" href="/forgot-password">
        Forgot Password?
      </a>
    </div>
  );
}
