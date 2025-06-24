import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const navigate = useNavigate();

  const handleReset = () => {
    alert("Password successfully reset");
    navigate('/');
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Reset Password</h2>
      <input type="password" placeholder="New Password" className="border p-2 my-2" />
      <button className="bg-green-500 text-white p-2" onClick={handleReset}>
        Reset Password
      </button>
    </div>
  );
}
