export const products = [
  { id: 1, name: "Laskar Pelangi", author: "Andrea Hirata", price: 89000, stock: 12, category: "Drama", cover: "bg-purple-700", image: "/novel laskar pelangi.avif" },
  { id: 2, name: "Bumi Manusia", author: "Pramoedya Ananta Toer", price: 110000, stock: 4, category: "Sejarah", cover: "bg-pink-700", image: "/novel bumi manusia.jpg" },
  { id: 3, name: "Cantik Itu Luka", author: "Eka Kurniawan", price: 105000, stock: 0, category: "Sastra", cover: "bg-fuchsia-700", image: "/cantik itu luka.jpg" },
  { id: 4, name: "Laut Bercerita", author: "Leila S. Chudori", price: 99000, stock: 9, category: "Sejarah", cover: "bg-indigo-700", image: "/novel laut bercerita.jpg" },
  { id: 5, name: "Dilan 1990", author: "Pidi Baiq", price: 79000, stock: 20, category: "Romansa", cover: "bg-rose-700", image: "/novel dilan.jpg" },
  { id: 6, name: "Pulang", author: "Tere Liye", price: 95000, stock: 3, category: "Drama", cover: "bg-violet-700", image: "/novel pulang.webp" },
];

export const categories = ["Semua Kategori", "Drama", "Sejarah", "Sastra", "Romansa"];

export const rupiah = (n) => "Rp " + n.toLocaleString("id-ID");