import { useState } from "react";

// Props: productId dikirim dari ProductDetail.jsx
export default function ReviewSection({ productId }) {
  const [reviews, setReviews] = useState([]); // useState: daftar ulasan
  const [nama, setNama] = useState("");
  const [rating, setRating] = useState(0);
  const [komentar, setKomentar] = useState("");
  const [error, setError] = useState("");

  const average = reviews.length
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nama.trim() || rating === 0 || !komentar.trim()) {
      setError("Nama, rating, dan ulasan wajib diisi.");
      return;
    }
    setError("");
    setReviews((prev) => [{ id: Date.now(), nama, rating, komentar }, ...prev]);
    setNama("");
    setRating(0);
    setKomentar("");
  };

  const stars = (n) => "★".repeat(n) + "☆".repeat(5 - n);

  return (
    <section className="mt-6 rounded-2xl bg-white p-6 shadow" data-product={productId}>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xl font-bold text-purple-700">Rating & Ulasan</h3>
        {/* Conditional rendering: rata-rata hanya tampil jika sudah ada ulasan */}
        {reviews.length > 0 && (
          <span className="rounded-full bg-pink-100 px-3 py-1 text-sm text-pink-700">
            ★ {average} ({reviews.length} ulasan)
          </span>
        )}
      </div>

      <form onSubmit={handleSubmit} className="mb-6 space-y-3">
        <input
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          placeholder="Nama kamu"
          className="w-full rounded-lg border border-purple-200 px-4 py-2 outline-none focus:border-purple-500"
        />
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setRating(n)}
              className={`text-2xl ${n <= rating ? "text-pink-500" : "text-gray-300"}`}
              aria-label={`Rating ${n}`}
            >
              ★
            </button>
          ))}
          <span className="ml-2 text-sm text-gray-500">{rating > 0 ? `${rating}/5` : "Pilih rating"}</span>
        </div>
        <textarea
          value={komentar}
          onChange={(e) => setKomentar(e.target.value)}
          placeholder="Tulis ulasan kamu tentang novel ini..."
          rows={3}
          className="w-full rounded-lg border border-purple-200 px-4 py-2 outline-none focus:border-purple-500"
        />
        {error && <p className="text-sm text-pink-600">{error}</p>}
        <button type="submit" className="rounded-full bg-purple-700 px-6 py-2 text-white hover:bg-purple-800">
          Kirim ulasan
        </button>
      </form>

      {/* Conditional rendering: belum ada ulasan / daftar ulasan */}
      {reviews.length === 0 ? (
        <p className="text-gray-500">Belum ada ulasan. Jadilah yang pertama!</p>
      ) : (
        <ul className="space-y-3">
          {reviews.map((r) => (
            <li key={r.id} className="rounded-xl bg-purple-50 p-4">
              <div className="flex items-center justify-between">
                <span className="font-semibold">{r.nama}</span>
                <span className="text-pink-500">{stars(r.rating)}</span>
              </div>
              <p className="mt-1 text-sm text-gray-700">{r.komentar}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}