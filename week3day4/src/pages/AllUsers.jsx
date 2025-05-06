import { Link } from "react-router-dom";

export default function AllUsers() {
  const users = JSON.parse(sessionStorage.getItem("users") || "[]");

  return (
    <div>
      <h2 className="text-2xl font-bold text-blue-700 mb-4">
        <i className="fas fa-users mr-2"></i> All Users
      </h2>
      {users.length === 0 ? (
        <p className="text-gray-500">No users found.</p>
      ) : (
        <ul className="space-y-2">
          {users.map((user) => (
            <li key={user.id}>
              <Link
                to={`/users/${user.id}`}
                className="block p-3 rounded bg-white shadow hover:bg-gray-100 transition"
              >
                <strong>{user.firstName} {user.lastName}</strong>{" "}
                <span className="text-sm text-gray-500">
                  {new Date(user.timestamp).toLocaleString()}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
