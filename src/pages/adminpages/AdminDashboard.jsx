
import { Link } from "react-router-dom";
import { useProducts } from "../../utils/ProductContext";

// Mengambil nama kategori dari data Laravel
function getCategoryName(category) {
  if (!category) return "Novel";

  if (typeof category === "string") {
    return category;
  }

  if (typeof category === "object") {
    return getCategoryName(
      category.name ||
      category.category ||
      category.category_name
    );
  }

  return "Novel";
}

export default function AdminDashboard() {
  const { products = [], isLoading } = useProducts();

  // Perhitungan data novel
  const totalNovel = products.length;

  const totalStok = products.reduce(
    (sum, p) => sum + Number(p.stock || 0),
    0
  );

  const stokHabis = products.filter(
    (p) => Number(p.stock) <= 0
  ).length;

  const stokMenipis = products.filter(
    (p) =>
      Number(p.stock) > 0 &&
      Number(p.stock) <= 5
  ).length;

  const stats = [
    {
      label: "Total Novel",
      value: totalNovel,
      icon: "📚",
      color: "bg-purple-100 text-purple-700",
    },
    {
      label: "Total Stok",
      value: totalStok,
      icon: "📦",
      color: "bg-pink-100 text-pink-700",
    },
    {
      label: "Stok Menipis",
      value: stokMenipis,
      icon: "⚠️",
      color: "bg-yellow-100 text-yellow-700",
    },
    {
      label: "Stok Habis",
      value: stokHabis,
      icon: "❌",
      color: "bg-red-100 text-red-700",
    },
  ];

  return (
    <div className="min-h-screen bg-pink-50 p-5 space-y-6">

      {/* Judul Dashboard */}
      <div>
        <h1 className="text-3xl font-bold text-purple-800">
          Dashboard Rak Novel 📚
        </h1>

        <p className="text-gray-500 mt-1">
          Selamat datang di halaman administrasi Rak Novel.
          Kelola koleksi novel dengan mudah.
        </p>
      </div>

      {isLoading ? (
        <p className="text-purple-700 font-medium">
          Memuat data novel...
        </p>
      ) : (
        <>
          {/* Statistik */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {stats.map((s) => (
              <div
                key={s.label}
                className="bg-white rounded-2xl shadow-md p-5 border border-purple-100 hover:shadow-lg transition"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">
                      {s.label}
                    </p>

                    <p className="text-3xl font-bold text-purple-800 mt-2">
                      {s.value}
                    </p>
                  </div>

                  <div
                    className={`${s.color} w-14 h-14 rounded-xl flex items-center justify-center text-2xl`}
                  >
                    {s.icon}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Informasi Koleksi Novel */}
          <div className="bg-white rounded-2xl shadow-md p-6 border border-purple-100">
            <h2 className="text-xl font-bold text-purple-800 mb-4">
              Informasi Koleksi Novel
            </h2>

            <div className="space-y-4">

              {products.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between border-b border-gray-100 pb-3"
                >
                  <div>
                    <p className="font-semibold text-gray-800">
                      {p.title || p.name || "Tanpa Judul"}
                    </p>

                    <p className="text-sm text-gray-500">
                      {getCategoryName(p.category)}
                    </p>
                  </div>

                  <div>
                    {Number(p.stock) <= 0 ? (
                      <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-semibold">
                        Habis
                      </span>
                    ) : Number(p.stock) <= 5 ? (
                      <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-semibold">
                        Menipis ({p.stock})
                      </span>
                    ) : (
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                        Tersedia ({p.stock})
                      </span>
                    )}
                  </div>
                </div>
              ))}

              {products.length === 0 && (
                <p className="text-center text-gray-400 py-5">
                  Belum ada data novel.
                </p>
              )}
            </div>
          </div>
        </>
      )}

      {/* Tombol Kelola Novel */}
      <div className="flex justify-end">
        <Link
          to="/admin/product"
          className="bg-purple-700 hover:bg-purple-800 text-white px-6 py-3 rounded-xl font-semibold transition"
        >
          Kelola Novel →
        </Link>
      </div>

    </div>
  );
}
