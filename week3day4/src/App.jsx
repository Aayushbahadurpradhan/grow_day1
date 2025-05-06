import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Breadcrumb from "./components/Breadcrumb";
import Home from "./pages/Home";
import About from "./pages/About";
import AllUsers from "./pages/AllUsers";
import UserProfile from "./pages/UserProfile";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-6">
        <Navbar />
        <Breadcrumb />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/users" element={<AllUsers />} />
          <Route path="/users/:id" element={<UserProfile />} />
        </Routes>
      </div>
    </div>
  );
}
