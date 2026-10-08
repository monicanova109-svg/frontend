import { NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { totalQty } = useCart();

  const linkClass = ({ isActive }) =>
    `rounded-full px-4 py-1.5 text-sm font-medium transition ${
      isActive ? "bg-white text-purple-700" : "hover:bg-white/20"
    }`;

  return (
    <header className="flex flex-wrap items-center justify-between gap-2 border-b-4 border-pink-500 bg-purple-700 px-6 py-4 text-white shadow">
      <h1 className="text-2xl font-extrabold">Rak Novel</h1>
      <nav className="flex flex-wrap gap-1">
        <NavLink to="/" end className={linkClass}>Dashboard</NavLink>
        <NavLink to="/cart" className={linkClass}>
          Keranjang
          {/* Conditional rendering: badge hanya tampil jika keranjang berisi */}
          {totalQty > 0 && (
            <span className="ml-2 rounded-full bg-pink-500 px-2 py-0.5 text-xs text-white">{totalQty}</span>
          )}
        </NavLink>
        <NavLink to="/checkout" className={linkClass}>Checkout</NavLink>
      </nav>
    </header>
  );
}