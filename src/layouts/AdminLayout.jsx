import { NavLink, Outlet, useLocation } from "react-router-dom";
import { products } from "../utils/data";

const menus = [
  { to: "/admin/dashboard", label: "Dashboard" },
  { to: "/admin/about", label: "About" },
];

// Conditional rendering: status stok untuk tabel
const stokStatus = (stock) => {
  if (stock === 0) return { label: "Habis", cls: "bg-gray-200 text-gray-600" };
  if (stock <= 5) return { label: "Menipis", cls: "bg-pink-100 text-pink-700" };
  return { label: "Tersedia", cls: "bg-purple-100 text-purple-700" };
};

export default function AdminLayout() {
  const { pathname } = useLocation();
  const isAbout = pathname.startsWith("/admin/about");

  const totalJudul = products.length;
  const totalMenipis = products.filter((p) => p.stock > 0 && p.stock <= 5).length;
  const totalHabis = products.filter((p) => p.stock === 0).length;

  const stats = [
    { label: "Judul novel", value: totalJudul, color: "text-purple-700" },
    { label: "Stok menipis", value: totalMenipis, color: "text-pink-600" },
    { label: "Stok habis", value: totalHabis, color: "text-gray-600" },
  ];

  return (
    <div className="flex min-h-screen bg-pink-50/40">
      {/* SIDEBAR */}
      <aside className="w-72 shrink-0 bg-gradient-to-b from-purple-700 via-fuchsia-600 to-pink-500 p-8 text-white">
        <h1 className="mb-10 text-3xl font-extrabold">My Admin 🌸</h1>

        <nav className="flex flex-col gap-3">
          {menus.map((menu) => (
            <NavLink
              key={menu.to}
              to={menu.to}
              className={({ isActive }) =>
                `rounded-xl px-5 py-4 text-lg font-semibold transition ${
                  isActive
                    ? "bg-white text-pink-600 shadow-lg"
                    : "text-white hover:bg-white/20"
                }`
              }
            >
              {menu.label}
            </NavLink>
          ))}

          {/* Link dari admin ke halaman Home */}
          <NavLink
            to="/"
            className="mt-4 rounded-xl border-2 border-white/60 px-5 py-4 text-center text-lg font-semibold text-white transition hover:bg-white/20"
          >
            ← Ke Halaman Home
          </NavLink>
        </nav>
      </aside>

      {/* KONTEN */}
      <div className="flex flex-1 flex-col">
        {/* HEADER */}
        <header className="flex items-center justify-between border-b-4 border-pink-500 bg-white px-8 py-5">
          <div>
            <h2 className="text-2xl font-extrabold text-purple-600">My Admin</h2>
            <p className="text-sm text-gray-500">Kelola data aplikasi kamu</p>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-medium text-gray-700">Halo, Monica 👋</span>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-orange-400 text-lg font-bold text-white">
              M
            </div>
          </div>
        </header>

        {/* ISI HALAMAN */}
        <main className="flex-1 p-8">
          {isAbout ? (
            /* ABOUT: judul + kartu putih, isi kartu dari AboutPages */
            <div>
              <h2 className="mb-4 text-3xl font-extrabold text-purple-700">About</h2>
              <div className="rounded-xl bg-white p-6 text-gray-700 shadow">
                <Outlet />
              </div>
            </div>
          ) : (
            /* DASHBOARD: banner + ringkasan + tabel stok + welcome */
            <div className="space-y-6">
              <div className="rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-600 p-10 text-white shadow-lg">
                <h2 className="text-4xl font-extrabold">My Admin Dashboard</h2>
                <p className="mt-2 text-lg text-white/90">
                  Kelola aplikasi kamu dengan mudah di sini.
                </p>
              </div>

              {/* Kartu ringkasan */}
              <div className="grid gap-4 sm:grid-cols-3">
                {stats.map((s) => (
                  <div key={s.label} className="rounded-2xl bg-white p-5 shadow">
                    <p className="text-sm text-gray-500">{s.label}</p>
                    <p className={`mt-1 text-4xl font-extrabold ${s.color}`}>{s.value}</p>
                  </div>
                ))}
              </div>

              {/* Tabel stok novel */}
              <div className="overflow-hidden rounded-2xl bg-white shadow">
                <h3 className="border-b border-pink-100 px-6 py-4 text-lg font-bold text-purple-700">
                  Stok novel
                </h3>
                <table className="w-full text-left text-sm">
                  <thead className="bg-purple-50 text-purple-700">
                    <tr>
                      <th className="px-6 py-3">Judul</th>
                      <th className="px-6 py-3">Kategori</th>
                      <th className="px-6 py-3">Stok</th>
                      <th className="px-6 py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((p) => {
                      const status = stokStatus(p.stock);
                      return (
                        <tr key={p.id} className="border-t border-pink-50">
                          <td className="px-6 py-3 font-medium text-gray-800">{p.name}</td>
                          <td className="px-6 py-3 text-gray-500">{p.category}</td>
                          <td className="px-6 py-3 text-gray-700">{p.stock}</td>
                          <td className="px-6 py-3">
                            <span className={`rounded-full px-3 py-1 text-xs font-medium ${status.cls}`}>
                              {status.label}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Kartu welcome */}
              <div className="flex items-center gap-5 rounded-2xl bg-white p-6 shadow">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 text-3xl">
                  👋
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">
                    Welcome to the admin dashboard!
                  </h3>
                  <p className="text-gray-500">Selamat datang kembali, Admin.</p>
                </div>
              </div>
            </div>
          )}
        </main>

        {/* FOOTER */}
        <footer className="border-t border-pink-100 bg-white py-4 text-center text-sm text-gray-600">
          © {new Date().getFullYear()} My Admin App — v1.0.0
        </footer>
      </div>
    </div>
  );
}