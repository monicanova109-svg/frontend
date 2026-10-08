import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/frontpages/Dashboard";
import Cart from "./pages/frontpages/Cart";
import Checkout from "./pages/frontpages/Checkout";
import ProductDetail from "./pages/frontpages/ProductDetail";
import AdminDashboard from "./pages/adminpages/AdminDashboard";
import AboutPages from "./pages/adminpages/AboutPages";

export default function App() {
  return (
    <Routes>
      {/* Sisi user */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="product/:id" element={<ProductDetail />} />
      </Route>

      {/* Sisi admin */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="about" element={<AboutPages />} />
      </Route>
    </Routes>
  );
}