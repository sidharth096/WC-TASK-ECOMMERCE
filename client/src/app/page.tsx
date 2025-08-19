"use client";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Welcome to My Store 🛍️</h1>
      <p className="text-gray-600 mb-6">Shop your favorite products with ease</p>

      {/* Navigate to Product Page */}
      <Link href="/products">
        <button className="px-6 py-3  text-white rounded-lg shadow bg-indigo-600 hover:bg-indigo-700 transition cursor-pointer">
          View Products
        </button>
      </Link>
    </div>
  );
}
