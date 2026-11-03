import { NavLink, Outlet } from "react-router-dom";

export default function AdminLayout() {
  const linkClass = ({ isActive }) =>
    `px-4 py-2 rounded-full font-semibold transition ${
      isActive ? "bg-white text-purple-700" : "text-white hover:bg-purple-600"
    }`;

  return (
    <div className="min-h-screen flex flex-col bg-pink-50">
      <header className="bg-purple-700 border-b-4 border-pink-500">
        <div className="flex items-center justify-between px-8 py-4">
          <h1 className="text-3xl font-extrabold text-white">Rak Novel Admin</h1>
          <nav className="flex items-center gap-2">
            <NavLink to="/admin/dashboard" className={linkClass}>
              Dashboard
            </NavLink>
            <NavLink to="/admin/about" className={linkClass}>
              About
            </NavLink>
            <NavLink to="/" className="px-4 py-2 text-white font-semibold hover:underline">
              Lihat Toko
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-8">
        <Outlet />
      </main>

      <footer className="bg-purple-700 text-white text-center py-4">
        © 2026 Rak Novel | Version 1.0
      </footer>
    </div>
  );
}