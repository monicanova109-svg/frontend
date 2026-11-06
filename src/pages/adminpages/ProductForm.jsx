
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useProducts } from "../../utils/ProductContext";

export default function ProductForm() {
  const { addProduct, getCategories } = useProducts();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
    category_id: "",
    description: "",
    img: null,
  });

  const [errors, setErrors] = useState({});

  // Mengambil data kategori dari API Laravel
  const {
    data: categories = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  // Mengatur perubahan input
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  // Menyimpan produk
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const data = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== "") {
        data.append(key, value);
      }
    });

    try {
      await addProduct(data);

      toast.success("Produk berhasil disimpan!");

      setTimeout(() => {
        navigate("/admin/dashboard");
      }, 1000);

    } catch (error) {
      if (error.response?.status === 422) {
        setErrors(error.response.data.errors || {});
        toast.error("⚠ Periksa kembali data yang dimasukkan.");
      } else {
        console.error("Gagal menyimpan produk:", error);
        toast.error("❌ Gagal menyimpan produk.");
      }
    }
  };

  // Style input
  const inputClass = (field) =>
    `border rounded-md p-2 w-full ${
      errors[field] ? "border-red-500" : "border-gray-300"
    }`;

  // Menampilkan pesan error
  const Error = ({ field }) =>
    errors[field] ? (
      <p className="text-red-500 text-sm mt-1">
        {errors[field][0]}
      </p>
    ) : null;

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white shadow-md rounded-2xl p-6 space-y-4"
    >
      <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">
        Tambah Produk
      </h2>

      {/* Nama Produk */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-600 mb-1">
          Nama Produk
        </label>

        <input
          name="name"
          value={formData.name}
          placeholder="Nama Produk"
          onChange={handleChange}
          className={inputClass("name")}
        />

        <Error field="name" />
      </div>

      {/* Pilih Kategori */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-600 mb-1">
          Pilih Kategori
        </label>

        <select
          name="category_id"
          value={formData.category_id}
          onChange={handleChange}
          className={inputClass("category_id")}
        >
          <option value="">
            {isLoading
              ? "Memuat kategori..."
              : "-- Pilih Kategori --"}
          </option>

          {!isLoading && !isError &&
            categories.map((cat) => (
              <option
                key={cat.category_id}
                value={cat.category_id}
              >
                {cat.category}
              </option>
            ))}
        </select>

        {isError && (
          <p className="text-red-500 text-sm mt-1">
            Gagal mengambil data kategori.
          </p>
        )}

        {!isLoading && !isError && categories.length === 0 && (
          <p className="text-red-500 text-sm mt-1">
            Belum ada kategori tersedia.
          </p>
        )}

        <Error field="category_id" />
      </div>

      {/* Harga */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-600 mb-1">
          Harga
        </label>

        <input
          name="price"
          type="number"
          value={formData.price}
          placeholder="Harga Produk"
          onChange={handleChange}
          className={inputClass("price")}
        />

        <Error field="price" />
      </div>

      {/* Stok */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-600 mb-1">
          Stok
        </label>

        <input
          name="stock"
          type="number"
          value={formData.stock}
          placeholder="Jumlah Stok"
          onChange={handleChange}
          className={inputClass("stock")}
        />

        <Error field="stock" />
      </div>

      {/* Deskripsi */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-600 mb-1">
          Deskripsi
        </label>

        <textarea
          name="description"
          value={formData.description}
          placeholder="Tuliskan deskripsi produk"
          onChange={handleChange}
          rows="3"
          className="border border-gray-300 rounded-lg p-2 resize-none"
        />
      </div>

      {/* Gambar Produk */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-600 mb-1">
          Gambar Produk
        </label>

        <input
          name="img"
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="border border-gray-300 rounded-lg p-2 bg-gray-50"
        />

        <Error field="img" />
      </div>

      {/* Tombol Simpan */}
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-200"
      >
        Simpan Produk
      </button>
    </form>
  );
}
