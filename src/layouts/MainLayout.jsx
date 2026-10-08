import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-pink-50">
      {/* Header/Navbar */}
      <Navbar />

      {/* Main Section */}
      <main className="mx-auto w-full max-w-5xl flex-1 p-6">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-purple-700 p-4 text-center text-white">
        <p>© 2026 Rak Novel | Version 1.0</p>
      </footer>
    </div>
  );
}