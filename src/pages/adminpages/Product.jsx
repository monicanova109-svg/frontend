import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useProducts } from "../../utils/ProductContext";

const LIMIT = 5;

// Mengambil gambar novel dari folder public
function getImageSrc(product) {
  const nama = (product.title || product.name || "")
    .toLowerCase()
    .trim();

  const images = {
    "laskar pelangi": "/novel laskar pelangi.avif",
    "bumi manusia": "/novel bumi manusia.jpg",
    "cantik itu luka": "/cantik itu luka.jpg",
    "laut bercerita": "/novel laut bercerita.jpg",
    "dilan 1990": "/novel dilan.jpg",
    "pulang": "/novel pulang.webp",
  };

  return images[nama] || null;
}

// Mengambil nama novel
function getProductName(product) {
  return product.title || product.name || "Tanpa Judul";
}

// Mengambil nama kategori
function getCategoryName(product) {
  if (typeof product.category === "string") {
    return product.category;
  }

  return (
    product.category?.category ||
    product.category?.name ||
    "-"
  );
}

export default function Product() {
  const { getProducts, getCategories, deleteProduct } = useProducts();

  const queryClient = useQueryClient();

  const [page, setPage] = useState(1);
  const [categoryId, setCategoryId] = useState("");
  const [keywordInput, setKeywordInput] = useState("");

  const [filter, setFilter] = useState({
    category_id: "",
    keyword: "",
  });

  // Mengambil kategori
  const {
    data: categories = [],
    isLoading: loadingCategories,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  // Mengambil daftar novel
  const {
    data,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products", "list", page, filter],
    queryFn: () =>
      getProducts({
        page,
        limit: LIMIT,
        ...filter,
      }),
    placeholderData: (prev) => prev,
  });

  const items = data?.data ?? [];
  const lastPage = data?.last_page ?? 1;

  // Pencarian dan filter kategori
  const handleSearch = (e) => {
    e.preventDefault();

    setPage(1);

    setFilter({
      category_id: categoryId,
      keyword: keywordInput,
    });
  };

  // Menghapus novel
  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "Apakah kamu yakin ingin menghapus novel ini?"
      )
    ) {
      return;
    }

    try {
      await deleteProduct.mutateAsync(id);

      queryClient.invalidateQueries({
        queryKey: ["products"],
      });

      toast.success("Novel berhasil dihapus!");

      if (items.length === 1 && page > 1) {
        setPage((current) => current - 1);
      }
    } catch (error) {
      console.error(error);
      toast.error("Gagal menghapus novel.");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-pink-50 flex items-center justify-center">
        <p className="text-purple-700 font-semibold">
          Memuat data novel...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-pink-50 flex items-center justify-center">
        <p className="text-red-500">
          Gagal mengambil data novel.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pink-50 p-4 md:p-8">

      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-sm border border-pink-100 p-4 md:p-6">

        {/* Judul */}
        <div className="mb-5">
          <h1 className="text-2xl font-bold text-purple-800">
            Manajemen Novel
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Kelola koleksi novel Rak Novel dengan mudah.
          </p>
        </div>

        {/* Pencarian dan Filter */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-5">

          <form
            onSubmit={handleSearch}
            className="flex flex-col sm:flex-row gap-2 w-full md:w-auto"
          >

            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="border border-purple-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-purple-400 bg-white"
            >
              <option value="">Semua Kategori</option>

              {categories.map((cat) => (
                <option
                  key={cat.category_id}
                  value={cat.category_id}
                >
                  {cat.category}
                </option>
              ))}
            </select>

            <input
              type="text"
              value={keywordInput}
              onChange={(e) => setKeywordInput(e.target.value)}
              placeholder="Cari judul novel..."
              className="border border-purple-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-purple-400"
            />

            <button
              type="submit"
              className="bg-purple-700 hover:bg-purple-800 text-white rounded-lg px-5 py-2 transition"
            >
              Cari
            </button>

          </form>

          {/* Tambah Novel */}
          <Link
            to="/admin/add-product"
            className="bg-green-600 hover:bg-green-700 text-white rounded-lg px-5 py-2 text-center transition"
          >
            + Tambah Novel
          </Link>

        </div>

        {/* Tabel Novel */}
        <div className="overflow-x-auto rounded-lg border border-purple-100">

          <table className="w-full min-w-[750px] border-collapse">

            <thead>
              <tr className="bg-purple-100 text-purple-900 text-left">
                <th className="p-3 border border-purple-200">#</th>
                <th className="p-3 border border-purple-200">Sampul</th>
                <th className="p-3 border border-purple-200">Judul Novel</th>
                <th className="p-3 border border-purple-200">Kategori</th>
                <th className="p-3 border border-purple-200">Harga</th>
                <th className="p-3 border border-purple-200">Stok</th>
                <th className="p-3 border border-purple-200">Aksi</th>
              </tr>
            </thead>

            <tbody>

              {items.length === 0 && (
                <tr>
                  <td
                    colSpan="7"
                    className="p-8 text-center text-gray-400"
                  >
                    Belum ada novel yang tersedia.
                  </td>
                </tr>
              )}

              {items.map((product, index) => {
                const gambar = getImageSrc(product);
                const nama = getProductName(product);
                const kategori = getCategoryName(product);

                const stok = Number(product.stock || 0);

                return (
                  <tr
                    key={product.id}
                    className="hover:bg-pink-50 transition"
                  >

                    <td className="p-3 border border-purple-100">
                      {(page - 1) * LIMIT + index + 1}
                    </td>

                   {/* Sampul Novel */}
<td className="p-3 border border-purple-100">
  {gambar ? (
    <img
      src={gambar}
      alt={nama}
      className="w-16 h-24 object-cover rounded-md shadow-sm"
      onError={(e) => {
        e.currentTarget.style.display = "none";
      }}
    />
  ) : (
    <div className="w-16 h-24 bg-purple-50 rounded-md flex items-center justify-center text-xs text-purple-400">
      No Image
    </div>
  )}
</td>

                    {/* Judul */}
                    <td className="p-3 border border-purple-100 font-medium text-gray-800">
                      {nama}
                    </td>

                    {/* Kategori */}
                    <td className="p-3 border border-purple-100">
                      <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs">
                        {kategori}
                      </span>
                    </td>

                    {/* Harga */}
                    <td className="p-3 border border-purple-100 whitespace-nowrap">
                      Rp {Number(product.price || 0).toLocaleString("id-ID")}
                    </td>

                    {/* Stok */}
                    <td className="p-3 border border-purple-100">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          stok <= 0
                            ? "bg-red-100 text-red-600"
                            : stok <= 5
                            ? "bg-pink-100 text-pink-600"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {stok}
                      </span>
                    </td>

                    {/* Aksi */}
                    <td className="p-3 border border-purple-100 whitespace-nowrap">
                      <div className="flex items-center gap-3">

                        <Link
                          to={`/admin/edit-product/${product.id}`}
                          className="text-purple-700 hover:text-purple-900 hover:underline"
                        >
                          Edit
                        </Link>

                        <button
                          onClick={() => handleDelete(product.id)}
                          className="text-red-500 hover:text-red-700 hover:underline"
                        >
                          Hapus
                        </button>

                      </div>
                    </td>

                  </tr>
                );
              })}

            </tbody>
          </table>

        </div>

        {/* Pagination */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">

          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="rounded-lg px-4 py-2 bg-purple-100 text-purple-800 hover:bg-purple-200 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Sebelumnya
          </button>

          {Array.from(
            { length: lastPage },
            (_, i) => i + 1
          ).map((number) => (
            <button
              key={number}
              onClick={() => setPage(number)}
              className={`rounded-lg px-4 py-2 transition ${
                number === page
                  ? "bg-purple-700 text-white"
                  : "bg-purple-100 text-purple-800 hover:bg-purple-200"
              }`}
            >
              {number}
            </button>
          ))}

          <button
            onClick={() =>
              setPage((p) => Math.min(lastPage, p + 1))
            }
            disabled={page === lastPage}
            className="rounded-lg px-4 py-2 bg-purple-700 text-white hover:bg-purple-800 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Berikutnya
          </button>

        </div>

      </div>

    </div>
  );
}
