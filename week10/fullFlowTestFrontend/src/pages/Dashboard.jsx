import { useEffect, useState } from "react";
import { getUserInfo } from "../services/authService";

export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUserInfo().then(setUser);
  }, []);

  return user ? (
    <div>
      <h1>Welcome, {user.name}</h1>
      <p>Email: {user.email}</p>
    </div>
  ) : (
    <p>Loading...</p>
  );
}
