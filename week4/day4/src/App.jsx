import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ErrorLogService from "./features/components/ErrorLogService";
import Posts from "./features/components/Posts";
import Todos from "./features/components/Todos";
import Users from "./features/components/Users";

export default function App() {
  return (
    <Router>
      <div className="p-8 space-y-6">
        <h1 className="text-6xl font-bold">RTK Query Mini Project</h1>

        <nav className="space-x-4">
          <Link to="/users">
            <button className="bg-blue-600 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
              Users
            </button>
          </Link>
          <Link to="/posts">
            <button className="bg-green-600 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded">
              Posts
            </button>
          </Link>
          <Link to="/todos">
            <button className="bg-yellow-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded">
              Todos
            </button>
          </Link>
          <Link to="/errors">
            <button className="bg-red-400 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
              Error Logs
            </button>
          </Link>
        </nav>

        <Routes>
          <Route path="/users" element={<Users />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/todos" element={<Todos />} />
          <Route path="/errors" element={<ErrorLogService />} />
        </Routes>
      </div>
    </Router>
  );
}
