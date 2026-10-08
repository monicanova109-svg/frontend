import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { rupiah } from "../utils/data";

// Props: product dikirim dari Dashboard.jsx
export default function ProductCard({ product }) {
  const { addToCart, cart } = useCart();
  const [imgError, setImgError] = useState(false);

  const inCart = cart.find((i) => i.id === product.id)?.qty ?? 0;
  const habis = product.stock === 0;
  const menipis = !habis && product.stock <= 5;
  const hasImage = product.image && !imgError;

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl">
      <div className="relative h-56 text-white">
        {/* Conditional rendering: gambar sampul / sampul berwarna */}
        {hasImage ? (
          <img
            src={product.image}
            alt={product.name}
            onError={() => setImgError(true)}
            className={`h-full w-full object-cover ${habis ? "opacity-50 grayscale" : ""}`}
          />
        ) : (
          <div className={`flex h-full flex-col items-center justify-center p-4 text-center ${habis ? "bg-gray-400" : product.cover}`}>
            <h3 className="font-serif text-xl font-bold leading-tight">{product.name}</h3>
            <p className="mt-2 text-xs text-white/80">{product.author}</p>
          </div>
        )}

        {menipis && <span className="absolute right-3 top-3 rounded-full bg-white px-2 py-0.5 text-xs font-medium text-pink-700">Sisa {product.stock}</span>}
        {habis && <span className="absolute right-3 top-3 rounded-full bg-gray-700 px-2 py-0.5 text-xs">Habis</span>}
      </div>

      <div className="p-4">
        {hasImage && (
          <>
            <h3 className="font-semibold text-gray-800">{product.name}</h3>
            <p className="text-sm text-gray-500">{product.author}</p>
          </>
        )}
        <p className="mt-1 text-xs text-purple-500">{product.category}</p>
        <p className="mb-2 font-bold text-purple-700">{rupiah(product.price)}</p>
        <Link to={`/product/${product.id}`} className="mb-3 inline-block text-sm text-purple-600 hover:underline">
          Lihat Detail
        </Link>

        {habis ? (
          <button disabled className="w-full rounded-full bg-gray-200 py-2 text-sm text-gray-500">Stok habis</button>
        ) : (
          <button
            onClick={() => addToCart(product)}
            disabled={inCart >= product.stock}
            className="w-full rounded-full bg-purple-700 py-2 text-sm font-medium text-white hover:bg-purple-800 disabled:opacity-50"
          >
            {inCart > 0 ? `Di keranjang (${inCart}) · tambah` : "Add to Cart"}
          </button>
        )}
      </div>
    </div>
  );
}