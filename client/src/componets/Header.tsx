"use client";
import Link from "next/link";
import { ShoppingCart, Search, Menu, X, Heart, User } from "lucide-react";
import { useSelector } from "react-redux";
import { useState } from "react";
import type { RootState } from "@/store/store";
import { CartItem } from "@/store/cartSlice";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Get cart items from Redux store
  const cartItems = useSelector((state: RootState) => state.cart.items) as CartItem[];
  
  // Calculate total quantity of items in the cart
  const itemCount = cartItems.reduce((total, item) => total + item.qty, 0);

  // Toggle mobile menu
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Navigation items
  const navItems = [
    { href: "/products", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/products", label: "Categories" },
    { href: "/products", label: "About" },
    { href: "/products", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Left: Logo */}
          <div className="flex items-center">
            <Link 
              href="/" 
              className="flex items-center space-x-2 text-2xl lg:text-3xl font-bold text-indigo-600 hover:text-indigo-700 transition-colors duration-200"
            >
              <div className="bg-indigo-600 text-white p-2 rounded-lg shadow-md">
                <ShoppingCart className="w-6 h-6 lg:w-7 lg:h-7" />
              </div>
              <span className="hidden sm:block">MyStore</span>
            </Link>
          </div>

          {/* Center: Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative text-gray-700 hover:text-indigo-600 font-medium transition-colors duration-200 group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative hidden md:block">
              {!isSearchOpen ? (
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="p-2 text-gray-600 hover:text-indigo-600 transition-colors duration-200"
                >
                  <Search className="w-5 h-5" />
                </button>
              ) : (
                <div className="flex items-center bg-gray-50 rounded-lg border-2 border-indigo-200 focus-within:border-indigo-500 transition-colors duration-200">
                  <Search className="w-5 h-5 text-gray-400 ml-3" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="px-3 py-2 bg-transparent focus:outline-none text-gray-700 w-64"
                    autoFocus
                  />
                  <button
                    onClick={() => {
                      setIsSearchOpen(false);
                      setSearchQuery("");
                    }}
                    className="p-2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Wishlist (Desktop only) */}
            <Link
              href="/products"
              className="hidden lg:flex p-2 text-gray-600 hover:text-red-500 transition-colors duration-200 relative"
            >
              <Heart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center text-[10px]">
                3
              </span>
            </Link>

            {/* User Account (Desktop only) */}
            <Link
              href="/profile"
              className="hidden lg:flex p-2 text-gray-600 hover:text-indigo-600 transition-colors duration-200"
            >
              <User className="w-5 h-5" />
            </Link>

            {/* Cart Button */}
            <Link
              href="/cart"
              className="flex items-center bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 lg:px-4 lg:py-2 rounded-lg transition-all duration-200 group relative shadow-md hover:shadow-lg transform hover:scale-105"
            >
              <ShoppingCart className="w-5 h-5 mr-1 lg:mr-2 group-hover:animate-pulse" />
              <span className="hidden sm:inline font-medium">Cart</span>
              {itemCount > 0 && (
                <>
                  <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center shadow-lg animate-bounce">
                    {itemCount > 99 ? '99+' : itemCount}
                  </span>
                  {/* Cart total for larger screens */}
                  <span className="hidden xl:inline ml-2 text-sm opacity-90">
                    (${cartItems.reduce((total, item) => total + item.price * item.qty, 0).toFixed(2)})
                  </span>
                </>
              )}
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={toggleMenu}
              className="lg:hidden p-2 text-gray-600 hover:text-indigo-600 transition-colors duration-200"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 py-4">
            {/* Mobile Search */}
            <div className="mb-4 md:hidden">
              <div className="flex items-center bg-gray-50 rounded-lg border border-gray-200 focus-within:border-indigo-500 transition-colors duration-200">
                <Search className="w-5 h-5 text-gray-400 ml-3" />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="px-3 py-2 bg-transparent focus:outline-none text-gray-700 w-full"
                />
              </div>
            </div>

            {/* Mobile Navigation */}
            <nav className="space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-4 py-3 text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg font-medium transition-all duration-200"
                >
                  {item.label}
                </Link>
              ))}
              
              {/* Mobile-only links */}
              <Link
                href="/wishlist"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center px-4 py-3 text-gray-700 hover:text-red-500 hover:bg-red-50 rounded-lg font-medium transition-all duration-200"
              >
                <Heart className="w-5 h-5 mr-3" />
                Wishlist
                <span className="ml-auto bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  3
                </span>
              </Link>
              
              <Link
                href="/account"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center px-4 py-3 text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg font-medium transition-all duration-200"
              >
                <User className="w-5 h-5 mr-3" />
                My Account
              </Link>
            </nav>

            {/* Mobile Cart Summary */}
            {itemCount > 0 && (
              <div className="mt-4 p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                <div className="flex items-center justify-between">
                  <span className="text-indigo-700 font-medium">Cart Total:</span>
                  <span className="text-indigo-900 font-bold text-lg">
                    ${cartItems.reduce((total, item) => total + item.price * item.qty, 0).toFixed(2)}
                  </span>
                </div>
                <p className="text-sm text-indigo-600 mt-1">{itemCount} items</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Search Overlay for Mobile */}
      {isSearchOpen && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20">
          <div className="bg-white rounded-lg shadow-2xl m-4 w-full max-w-md">
            <div className="p-4">
              <div className="flex items-center bg-gray-50 rounded-lg border-2 border-indigo-200">
                <Search className="w-5 h-5 text-gray-400 ml-3" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="px-3 py-2 bg-transparent focus:outline-none text-gray-700 w-full"
                  autoFocus
                />
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="p-2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}