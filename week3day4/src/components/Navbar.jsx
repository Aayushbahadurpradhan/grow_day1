import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex flex-wrap gap-4 mb-6 text-blue-600 font-medium border-b pb-2">
      <Link to="/" className="hover:text-blue-800 transition">Home</Link>
      <Link to="/about" className="hover:text-blue-800 transition">About</Link>
      <Link to="/users" className="hover:text-blue-800 transition">All Users</Link>
    </nav>
  );
}
