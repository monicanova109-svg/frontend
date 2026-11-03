import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useProducts } from "../../utils/ProductContext";

const LIMIT = 5;

// Gambar di folder public, dicocokkan dengan judul novel
// (spasi pada nama file ditulis sebagai %20)
const GAMBAR_NOVEL = [
  { cari: "pulang", file: "/novel%20pulang.webp" },
  { cari: "dilan", file: "/novel%20dilan.jpg" },
  { cari: "laut bercerita", file: "/novel%20laut%20bercerita.jpg" },
  { cari: "bumi manusia", file: "/novel%20bumi%20manusia.jpg" },
  { cari: "cantik itu luka", file: "/cantik%20itu%20luka.jpg" },
  { cari: "laskar pelangi", file: "/novel%20laskar%20pelangi.avif" },
];

function getImageSrc(p) {
  // 1. Cocokkan dulu dari judul novel (gambar di folder public)
  const nama = (p.name || "").toLowerCase();
  const cocok = GAMBAR_NOVEL.find((g) => nama.includes(g.cari));
  if (cocok) return cocok.file;

  // 2. Kalau tidak cocok, baru pakai img_url dari database
  return p.img_url || null;
}

export default function AdminDashboard() {
  const { getProducts, getCategories, deleteProduct } = useProducts();
  const queryClient = useQueryClient();

  const [page, setPage] = useState(1);
  const [categoryId, setCategoryId] = useState("");
  const [keywordInput, setKeywordInput] = useState("");
  const [filter, setFilter] = useState({ category_id: "", keyword: "" });

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const { data, isLoading, isError } = useQuery({
    queryKey: ["products", "list", page, filter],
    queryFn: () => getProducts({ page, limit: LIMIT, ...filter }),
    placeholderData: (prev) => prev,
  });

  const items = data?.data ?? [];
  const lastPage = data?.last_page ?? 1;

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    setFilter({ category_id: categoryId, keyword: keywordInput });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Apakah kamu yakin ingin menghapus novel ini?")) return;
    try {
      await deleteProduct.mutateAsync(id);
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Novel berhasil dihapus!");
      if (items.length === 1 && page > 1) setPage(page - 1);
    } catch {
      toast.error("Terjadi kesalahan saat menghapus novel.");
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading products.</p>;

  return (
    <div className="p-4 bg-white rounded shadow">
      <h1 className="text-xl font-bold mb-4">Manajemen Novel</h1>

      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <form onSubmit={handleSearch} className="flex flex-wrap gap-2">
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="border rounded-md p-2"
          >
            <option value="">Semua Kategori</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          <input
            value={keywordInput}
            onChange={(e) => setKeywordInput(e.target.value)}
            placeholder="Cari novel..."
            className="border rounded-md p-2"
          />
          <button type="submit" className="bg-blue-600 text-white rounded-md px-4 py-2">
            Cari
          </button>
        </form>

        <Link to="/admin/add-product" className="bg-green-600 text-white rounded-md px-4 py-2">
          + Tambah Novel
        </Link>
      </div>

      <table className="table-auto w-full border">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2 border">#</th>
            <th className="p-2 border">Sampul</th>
            <th className="p-2 border">Judul</th>
            <th className="p-2 border">Harga</th>
            <th className="p-2 border">Stok</th>
            <th className="p-2 border">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {items.length === 0 && (
            <tr>
              <td colSpan="6" className="p-4 text-center text-gray-400">
                Tidak ada novel.
              </td>
            </tr>
          )}
          {items.map((p, index) => {
            const gambar = getImageSrc(p);
            return (
              <tr key={p.id}>
                <td className="p-2 border">{(page - 1) * LIMIT + index + 1}</td>
                <td className="p-2 border">
                  {gambar ? (
                    <img
                      src={gambar}
                      alt={p.name}
                      className="w-16 h-24 object-cover rounded"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  ) : (
                    <span className="text-gray-400 text-sm">Tidak ada</span>
                  )}
                </td>
                <td className="p-2 border">
                  {p.name} <br />
                  <small className="text-gray-500">#{p.category?.name}</small>
                </td>
                <td className="p-2 border">Rp. {Number(p.price).toLocaleString("id-ID")}</td>
                <td className="p-2 border">{p.stock}</td>
                <td className="p-2 border space-x-2">
                  <Link to={`/admin/edit-product/${p.id}`} className="text-blue-600 hover:underline">
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="cursor-pointer text-red-600 hover:underline"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="mt-4 flex items-center justify-center gap-2">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="rounded-md px-3 py-1 bg-gray-200 disabled:opacity-50"
        >
          Sebelumnya
        </button>

        {Array.from({ length: lastPage }, (_, i) => i + 1).map((n) => (
          <button
            key={n}
            onClick={() => setPage(n)}
            className={`rounded-md px-3 py-1 ${
              n === page ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            {n}
          </button>
        ))}

        <button
          onClick={() => setPage((p) => Math.min(lastPage, p + 1))}
          disabled={page === lastPage}
          className="rounded-md px-3 py-1 bg-blue-600 text-white disabled:opacity-50"
        >
          Berikutnya
        </button>
      </div>
    </div>
  );
}