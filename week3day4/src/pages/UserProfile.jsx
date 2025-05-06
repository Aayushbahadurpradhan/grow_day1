import { useParams, Link } from "react-router-dom";
export default function UserProfile() {
  const { id } = useParams();
  const users = JSON.parse(sessionStorage.getItem("users") || "[]");
  const user = users.find((u) => u.id === id);
  if (!user) {
    return (
      <div>
        <h2 className="text-xl font-bold text-red-600 mb-4">
          <i className="fas fa-user mr-2"></i> User Details
        </h2>
        <p className="text-gray-600">User not found.</p>
        <Link to="/users" className="text-blue-600 mt-4 inline-block">
          <i className="fas fa-arrow-left mr-1"></i> Back to all users
        </Link>
      </div>
    );
  }
  return (
    <div>
      <h2 className="text-xl font-bold text-green-700 mb-4">
        <i className="fas fa-user mr-2"></i> User Details
      </h2>
      <ul className="text-gray-700 space-y-2">
        <li><strong>First Name:</strong> {user.firstName}</li>
        <li><strong>Last Name:</strong> {user.lastName}</li>
        <li><strong>ID:</strong> {user.id}</li>
        <li><strong><i className="fas fa-clock mr-1"></i> Saved at: {new Date(user.timestamp).toLocaleString()}</strong></li>
      </ul>
      <Link to="/users" className="text-blue-600 mt-4 inline-block">
        <i className="fas fa-arrow-left mr-1"></i> Back to all users
      </Link>
    </div>
  );
}
