
import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { rupiah } from "../utils/data";

export default function ProductCard({ product }) {
  const { addToCart, cart } = useCart();
  const [imgError, setImgError] = useState(false);

  // Menyesuaikan nama data dari Laravel
  const nama = product.title || product.name || "Tanpa Judul";
 const kategori =
  typeof product.category === "object" && product.category !== null
    ? product.category.name ||
      product.category.category ||
      "-"
    : product.category || "-";

  const gambar =
    product.img_url ||
    product.image_url ||
    product.image ||
    product.img ||
    product.gambar;

  const penulis = product.author || product.writer || "";
  const stok = Number(product.stock || 0);
  const harga = Number(product.price || 0);

  const inCart =
    cart.find((item) => item.id === product.id)?.qty ?? 0;

  const habis = stok <= 0;
  const menipis = !habis && stok <= 5;

  const hasImage = gambar && !imgError;

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl">

      {/* Gambar Sampul */}
      <div className="relative h-56 bg-purple-50">
        {hasImage ? (
          <img
            src={gambar}
            alt={nama}
            onError={() => setImgError(true)}
            className={`h-full w-full object-cover ${
              habis ? "opacity-50 grayscale" : ""
            }`}
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-purple-200 to-pink-100 p-4 text-center">
            <h3 className="font-serif text-xl font-bold text-purple-800">
              {nama}
            </h3>
          </div>
        )}

        {menipis && (
          <span className="absolute right-3 top-3 rounded-full bg-white px-3 py-1 text-xs font-medium text-pink-700">
            Sisa {stok}
          </span>
        )}

        {habis && (
          <span className="absolute right-3 top-3 rounded-full bg-gray-700 px-3 py-1 text-xs text-white">
            Habis
          </span>
        )}
      </div>

      {/* Informasi Novel */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-800">
          {nama}
        </h3>

        <p className="text-sm text-gray-500">
          {penulis}
        </p>

        <p className="mt-1 text-xs text-purple-500">
          {kategori}
        </p>

        <p className="mb-2 font-bold text-purple-700">
          {rupiah(harga)}
        </p>

        <Link
          to={`/product/${product.id}`}
          className="mb-3 inline-block text-sm text-purple-600 hover:underline"
        >
          Lihat Detail
        </Link>

        {habis ? (
          <button
            disabled
            className="w-full rounded-full bg-gray-200 py-2 text-sm text-gray-500"
          >
            Stok habis
          </button>
        ) : (
          <button
            onClick={() => addToCart(product)}
            disabled={inCart >= stok}
            className="w-full rounded-full bg-purple-700 py-2 text-sm font-medium text-white transition hover:bg-purple-800 disabled:opacity-50"
          >
            {inCart > 0
              ? `Di keranjang (${inCart}) · tambah`
              : "Add to Cart"}
          </button>
        )}
      </div>
    </div>
  );
}
