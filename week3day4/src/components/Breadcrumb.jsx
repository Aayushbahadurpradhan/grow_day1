import { useLocation, Link } from "react-router-dom";
export default function Breadcrumb() {
  const { pathname } = useLocation();
  const segments = pathname.split("/").filter(Boolean);
  return (
    <div className="text-sm text-gray-600 bg-gray-50 p-2 rounded mb-6 shadow-sm">
      <Link to="/" className="text-blue-500 hover:underline">Home</Link>
      {segments.map((seg, idx) => {
        const path = "/" + segments.slice(0, idx + 1).join("/");
        return (
          <span key={idx}>
            <span className="mx-1 text-gray-400">/</span>
            <Link to={path} className="text-blue-500 hover:underline capitalize">{seg}</Link>
          </span>
        );
      })}
    </div>
  );
}
