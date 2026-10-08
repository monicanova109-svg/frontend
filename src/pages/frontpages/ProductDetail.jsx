import { Link, useParams } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { products, rupiah } from "../../utils/data";
import ReviewSection from "../../components/ReviewSection";

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const product = products.find((p) => p.id === Number(id));

  // Conditional rendering: novel tidak ditemukan
  if (!product) {
    return (
      <div className="rounded-2xl bg-white p-8 text-center shadow">
        <p className="mb-4 text-gray-500">Novel tidak ditemukan.</p>
        <Link to="/" className="rounded-full bg-purple-700 px-6 py-2 text-white">Kembali</Link>
      </div>
    );
  }

  return (
    <div>
      <div className="grid gap-6 rounded-2xl bg-white p-6 shadow md:grid-cols-2">
        <div className={`flex h-64 flex-col items-center justify-center rounded-xl p-6 text-center text-white ${product.stock === 0 ? "bg-gray-400" : product.cover}`}>
          <h2 className="font-serif text-3xl font-bold">{product.name}</h2>
          <p className="mt-2 text-white/80">{product.author}</p>
        </div>
        <div>
          <p className="text-sm text-purple-500">{product.category}</p>
          <h3 className="text-2xl font-bold">{product.name}</h3>
          <p className="text-gray-500">oleh {product.author}</p>
          <p className="my-3 text-2xl font-bold text-purple-700">{rupiah(product.price)}</p>
          <p className="mb-4 text-sm text-gray-600">Stok: {product.stock}</p>

          {product.stock === 0 ? (
            <span className="rounded-full bg-gray-200 px-4 py-2 text-gray-500">Stok habis</span>
          ) : (
            <button onClick={() => addToCart(product)} className="rounded-full bg-purple-700 px-6 py-2 text-white hover:bg-purple-800">
              Add to Cart
            </button>
          )}
          <div className="mt-4">
            <Link to="/" className="text-sm text-purple-600 hover:underline">← Kembali ke daftar</Link>
          </div>
        </div>
      </div>

      <ReviewSection productId={product.id} />
    </div>
  );
}