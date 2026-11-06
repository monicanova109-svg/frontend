
import { NavLink, Outlet, Link } from "react-router-dom";

export default function AdminLayout() {
  const link = ({ isActive }) =>
    `block px-4 py-3 rounded-xl transition-all duration-200 ${
      isActive
        ? "bg-purple-100 text-purple-800 font-bold shadow-sm"
        : "text-gray-600 hover:bg-purple-50 hover:text-purple-700"
    }`;

  return (
    <div className="min-h-screen flex flex-col bg-pink-50">

      {/* HEADER */}
      <header className="bg-purple-700 border-b-4 border-pink-400 px-6 py-4 flex flex-wrap items-center justify-between gap-4">

        <div>
          <h1 className="text-3xl font-extrabold text-white">
            Rak Novel Admin 📚
          </h1>

          <p className="text-purple-100 text-sm">
            Sistem Manajemen Koleksi Novel
          </p>
        </div>

        <div className="flex items-center gap-4">

          <span className="text-white font-medium">
            Halo, Admin 👋
          </span>

          <div className="w-12 h-12 rounded-full bg-white text-purple-700 font-bold flex items-center justify-center text-xl shadow">
            A
          </div>

        </div>
      </header>

      {/* SIDEBAR DAN KONTEN */}
      <div className="flex flex-1">

        {/* SIDEBAR */}
        <aside className="w-56 bg-white p-4 border-r border-purple-100 space-y-2 shrink-0">

          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider px-4 py-2">
            Menu Utama
          </p>

          <NavLink
            to="/admin/dashboard"
            end
            className={link}
          >
            📊 Dashboard
          </NavLink>

          <NavLink to="/admin/product" className={link}>
  📚 Manajemen Novel
</NavLink>

          <NavLink
            to="/admin/about"
            className={link}
          >
            ℹ️ About
          </NavLink>

          <div className="border-t border-purple-100 my-4 pt-3">

            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider px-4 py-2">
              Halaman User
            </p>

            <Link
              to="/"
              className="block px-4 py-3 rounded-xl text-purple-700 hover:bg-purple-50 font-medium transition"
            >
              🏠 Lihat Toko
            </Link>

          </div>

        </aside>

        {/* ISI HALAMAN */}
        <main className="flex-1 min-w-0 p-6">

          <Outlet />

        </main>

      </div>

      {/* FOOTER */}
      <footer className="bg-purple-700 text-white text-center py-4 border-t-4 border-pink-400">

        <p className="font-medium">
          © 2026 Rak Novel | Version 1.0
        </p>

        <p className="text-purple-200 text-xs mt-1">
          Sistem Informasi Manajemen Rak Novel
        </p>

      </footer>

    </div>
  );
}
