import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { rupiah } from "../../utils/data";

export default function Checkout() {
  const { cart, clearCart } = useCart();
  const [nama, setNama] = useState("");
  const [hp, setHp] = useState("");
  const [alamat, setAlamat] = useState("");
  const [metode, setMetode] = useState("Transfer Bank");
  const [error, setError] = useState("");
  const [sukses, setSukses] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  // Mengembalikan form ke kondisi awal supaya Checkout bisa dipakai lagi
  const resetForm = () => {
    setSukses(false);
    setNama("");
    setHp("");
    setAlamat("");
    setMetode("Transfer Bank");
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nama.trim() || !hp.trim() || !alamat.trim()) {
      setError("Nama, nomor HP, dan alamat wajib diisi.");
      return;
    }
    setError("");
    clearCart();
    setSukses(true);
  };

  // Conditional rendering 1: pesanan berhasil
  if (sukses) {
    return (
      <div className="rounded-2xl bg-green-100 p-8 text-center text-green-800">
        <h2 className="text-2xl font-bold">Pesanan berhasil dibuat</h2>
        <p className="mt-2">
          Terima kasih, {nama}. Novel akan dikirim ke alamat yang kamu isi. Metode pembayaran: {metode}.
        </p>
        <Link
          to="/"
          onClick={resetForm}
          className="mt-4 inline-block rounded-full bg-purple-700 px-6 py-2 text-white hover:bg-purple-800"
        >
          Kembali ke Home
        </Link>
      </div>
    );
  }

  // Conditional rendering 2: keranjang kosong
  if (cart.length === 0) {
    return (
      <div className="rounded-2xl bg-white p-8 text-center shadow">
        <p className="mb-4 text-gray-500">Belum ada novel untuk di-checkout.</p>
        <Link to="/" className="rounded-full bg-purple-700 px-6 py-2 text-white hover:bg-purple-800">
          Belanja novel
        </Link>
      </div>
    );
  }

  // Conditional rendering 3: form checkout
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl bg-white p-6 shadow">
        <h2 className="text-2xl font-bold text-purple-700">Checkout</h2>

        <input
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          placeholder="Nama lengkap"
          className="w-full rounded-lg border border-purple-200 px-4 py-2 outline-none focus:border-purple-500"
        />
        <input
          value={hp}
          onChange={(e) => setHp(e.target.value)}
          placeholder="Nomor HP"
          className="w-full rounded-lg border border-purple-200 px-4 py-2 outline-none focus:border-purple-500"
        />
        <textarea
          value={alamat}
          onChange={(e) => setAlamat(e.target.value)}
          placeholder="Alamat pengiriman"
          rows={3}
          className="w-full rounded-lg border border-purple-200 px-4 py-2 outline-none focus:border-purple-500"
        />
        <select
          value={metode}
          onChange={(e) => setMetode(e.target.value)}
          className="w-full rounded-lg border border-purple-200 px-4 py-2 outline-none focus:border-purple-500"
        >
          <option>Transfer Bank</option>
          <option>E-Wallet</option>
          <option>Bayar di Tempat (COD)</option>
        </select>

        {error && <p className="text-sm text-pink-600">{error}</p>}

        <button
          type="submit"
          className="w-full rounded-full bg-pink-600 py-2.5 font-medium text-white hover:bg-pink-700"
        >
          Buat pesanan
        </button>
      </form>

      <div className="rounded-2xl bg-white p-6 shadow">
        <h3 className="mb-3 font-bold text-purple-700">Ringkasan pesanan</h3>
        <ul className="space-y-2 text-sm">
          {cart.map((item) => (
            <li key={item.id} className="flex justify-between">
              <span>{item.name} × {item.qty}</span>
              <span>{rupiah(item.price * item.qty)}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 flex justify-between border-t pt-3 font-bold text-purple-700">
          <span>Total</span>
          <span>{rupiah(total)}</span>
        </p>
      </div>
    </div>
  );
}