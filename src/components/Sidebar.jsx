import { Link } from "react-router-dom";

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  return (
    <div className={`${sidebarOpen ? "block" : "hidden"} md:block w-64 bg-white shadow-md`}>
      <div className="p-4 font-bold text-xl">My Admin</div>
      <nav className="flex flex-col p-4 space-y-2">
        {/* Navigasi Link ke halaman dashboard */}
        <Link to="/admin/dashboard" className="hover:bg-gray-200 p-2 rounded">
          Dashboard
        </Link>
        <Link to="/admin/about" className="hover:bg-gray-200 p-2 rounded">
          About
        </Link>

        {/* Link dari admin ke halaman Home */}
        <Link
          to="/"
          className="mt-4 rounded-lg bg-purple-700 p-2 text-center text-white hover:bg-purple-800"
        >
          ← Ke Halaman Home
        </Link>
      </nav>
    </div>
  );
}