import { useState } from "react";
import ProductCard from "../../components/ProductCard";
import { products, categories } from "../../utils/data";

export default function Dashboard() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Semua Kategori");

  const filtered = products.filter(
    (p) =>
      (category === "Semua Kategori" || p.category === category) &&
      p.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <section className="mb-6 rounded-2xl bg-purple-700 p-8 text-white">
        <h2 className="text-3xl font-extrabold">Temukan novel favorit untuk dibaca malam ini.</h2>
        <p className="mt-2 text-purple-100">Novel sastra, sejarah, drama, dan romansa dari penulis Indonesia.</p>
      </section>

      <div className="mb-6 flex flex-wrap gap-3">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cari judul novel..."
          className="min-w-[200px] flex-1 rounded-full border border-purple-200 bg-white px-5 py-2.5 outline-none focus:border-purple-500"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-full border border-purple-200 bg-white px-4 py-2.5 outline-none focus:border-purple-500"
        >
          {categories.map((c) => <option key={c}>{c}</option>)}
        </select>
      </div>

      <h2 className="mb-4 text-2xl font-bold text-purple-700">Cari Judul Novel</h2>

      {/* Conditional rendering: hasil kosong / ada */}
      {filtered.length === 0 ? (
        <p className="text-gray-500">Novel tidak ditemukan. Coba kata kunci atau kategori lain.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  );
}