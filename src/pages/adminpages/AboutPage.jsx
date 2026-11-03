export default function AboutPage() {
  return (
    <div className="bg-white rounded-2xl shadow p-6 max-w-2xl">
      <h1 className="text-2xl font-bold text-purple-700 mb-2">Tentang My Admin</h1>
      <p className="text-gray-600 mb-4">
        My Admin adalah aplikasi dashboard untuk mengelola data produk. Data diambil
        dan disimpan lewat REST API Laravel, sedangkan tampilannya dibuat dengan React.
      </p>

      <h2 className="text-lg font-semibold text-pink-600 mb-2">Fitur</h2>
      <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
        <li>Melihat daftar produk</li>
        <li>Menambah, mengedit, dan menghapus produk</li>
        <li>Memilih kategori dari data API</li>
        <li>Notifikasi dengan React Hot Toast</li>
      </ul>

      <h2 className="text-lg font-semibold text-pink-600 mb-2">Teknologi</h2>
      <p className="text-gray-700 mb-4">
        React, Vite, Tailwind CSS, Axios, React Query, Laravel, dan Sanctum.
      </p>

      <p className="text-sm text-gray-500">Dibuat oleh Monica · v1.0.0</p>
    </div>
  );
}