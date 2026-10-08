import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { rupiah } from "../../utils/data";

export default function Cart() {
  const { cart, removeFromCart } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold text-purple-700">Keranjang</h2>

      {/* Conditional rendering: keranjang kosong / berisi */}
      {cart.length === 0 ? (
        <div className="rounded-2xl bg-white p-8 text-center shadow">
          <p className="mb-4 text-gray-500">Keranjang masih kosong.</p>
          <Link to="/" className="rounded-full bg-purple-700 px-6 py-2 text-white hover:bg-purple-800">
            Belanja novel
          </Link>
        </div>
      ) : (
        <>
          <ul className="space-y-3">
            {cart.map((item) => (
              <li key={item.id} className="flex items-center justify-between rounded-xl bg-white p-4 shadow">
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    {item.qty} × {rupiah(item.price)}
                  </p>
                </div>
                <button onClick={() => removeFromCart(item.id)} className="text-sm text-pink-600 hover:underline">
                  Hapus
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex items-center justify-between rounded-xl bg-purple-100 p-4">
            <span className="font-semibold">Total</span>
            <span className="text-xl font-bold text-purple-700">{rupiah(total)}</span>
          </div>

          <div className="mt-4 flex justify-end">
            <Link
              to="/checkout"
              className="rounded-full bg-pink-600 px-8 py-2.5 font-medium text-white hover:bg-pink-700"
            >
              Lanjut ke Checkout
            </Link>
          </div>
        </>
      )}
    </div>
  );
}