"use client";
import Link from "next/link";
import { ShoppingCart } from "lucide-react"; // icon library (auto-installed in Next.js)

export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white shadow">
      {/* Left: Logo */}
      <div className="text-2xl font-bold text-indigo-600 hover:text-indigo-700">
        MyStore
      </div>

      {/* Right: Nav + Cart */}
      <nav className="flex items-center space-x-6">
        <Link href="/" className="text-gray-700  hover:text-indigo-700">
          Home
        </Link>
        <Link href="/products" className="text-gray-700  hover:text-indigo-700">
          Products
        </Link>

        {/* Cart Button */}
        <Link
          href="/cart"
          className="flex items-center bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded  transition group"
        >
          <ShoppingCart className="w-5 h-5 mr-2 group-hover:animate-bounce" />
          Cart
        </Link>
      </nav>
    </header>
  );
}
