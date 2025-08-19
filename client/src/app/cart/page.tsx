"use client";
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/store/store';
import { addToCart, removeFromCart, updateQty, clearCart } from '@/store/cartSlice';
import Link from 'next/link';

const CartPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  // Calculate totals
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.qty, 0);
  const tax = subtotal * 0.08; // 8% tax
  const shipping = subtotal > 50 ? 0 : 5.99; // Free shipping over $50
  const totalPrice = subtotal + tax + shipping;

  // Handle quantity change
  const handleQtyChange = (id: string, qty: number) => {
    if (qty < 1) {
      dispatch(removeFromCart(id));
    } else {
      dispatch(updateQty({ id, qty }));
    }
  };

  // Handle increment/decrement
  const handleIncrement = (id: string, currentQty: number) => {
    dispatch(updateQty({ id, qty: currentQty + 1 }));
  };

  const handleDecrement = (id: string, currentQty: number) => {
    if (currentQty > 1) {
      dispatch(updateQty({ id, qty: currentQty - 1 }));
    } else {
      dispatch(removeFromCart(id));
    }
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    setShowClearConfirm(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Your Shopping Cart</h1>
          <p className="text-xl text-indigo-100 max-w-2xl mx-auto">
            Review your selected items before proceeding to checkout
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {cartItems.length === 0 ? (
          /* Empty Cart State */
          <div className="text-center py-16 bg-white rounded-xl shadow-sm">
            <div className="text-8xl mb-6">🛒</div>
            <h3 className="text-3xl font-bold text-gray-800 mb-4">Your cart is empty</h3>
            <p className="text-gray-600 mb-8 text-lg max-w-md mx-auto">
              Discover amazing products and start building your perfect collection
            </p>
            <Link
              href="/products"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-200 inline-flex items-center space-x-3 transform hover:scale-105"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
              </svg>
              <span>Start Shopping</span>
            </Link>
          </div>
        ) : (
          <div className="lg:grid lg:grid-cols-12 lg:gap-12">
            {/* Cart Items Section */}
            <div className="lg:col-span-8">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">Shopping Cart</h2>
                  <p className="text-gray-600 mt-1">
                    {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
                  </p>
                </div>
                {cartItems.length > 0 && (
                  <button
                    onClick={() => setShowClearConfirm(true)}
                    className="text-gray-500 hover:text-gray-700 font-medium transition-colors duration-200 flex items-center space-x-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    <span>Clear All</span>
                  </button>
                )}
              </div>

              {/* Cart Items */}
              <div className="space-y-4">
                {cartItems.map((item, index) => (
                  <div
                    key={item._id}
                    className={`bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-all duration-300 ${
                      index === 0 ? 'border-indigo-200 ring-1 ring-indigo-100' : ''
                    }`}
                  >
                    <div className="flex items-start space-x-6">
                      {/* Item Image */}
                      <div className="flex-shrink-0">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-lg shadow-sm"
                            onError={(e) => (e.currentTarget.src = '/fallback-image.jpg')}
                          />
                        ) : (
                          <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        )}
                      </div>

                      {/* Item Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                          {item.title}
                        </h3>
                        
                        <div className="flex items-center space-x-4 mb-4">
                          <span className="text-2xl font-bold text-gray-900">
                            ${item.price.toFixed(2)}
                          </span>
                          <span className="text-sm text-green-600 font-medium bg-green-50 px-2 py-1 rounded-full">
                            In Stock
                          </span>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <span className="text-gray-700 font-medium">Quantity:</span>
                            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                              <button
                                onClick={() => handleDecrement(item._id, item.qty)}
                                className="px-3 py-2 text-gray-600 hover:bg-gray-50 transition-colors duration-200"
                              >
                                −
                              </button>
                              <input
                                type="number"
                                min="1"
                                value={item.qty}
                                onChange={(e) =>
                                  handleQtyChange(item._id, parseInt(e.target.value) || 1)
                                }
                                className="w-16 px-3 py-2 text-center border-x border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                              />
                              <button
                                onClick={() => handleIncrement(item._id, item.qty)}
                                className="px-3 py-2 text-gray-600 hover:bg-gray-50 transition-colors duration-200"
                              >
                                +
                              </button>
                            </div>
                          </div>

                          <button
                            onClick={() => dispatch(removeFromCart(item._id))}
                            className="text-gray-400 hover:text-red-500 transition-colors duration-200 p-2"
                            title="Remove item"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>

                      {/* Item Total */}
                      <div className="text-right">
                        <p className="text-2xl font-bold text-gray-900">
                          ${(item.price * item.qty).toFixed(2)}
                        </p>
                        {item.qty > 1 && (
                          <p className="text-sm text-gray-500 mt-1">
                            ${item.price.toFixed(2)} each
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Continue Shopping */}
              <div className="mt-8">
                <Link
                  href="/products"
                  className="text-indigo-600 hover:text-indigo-700 font-medium transition-colors duration-200 inline-flex items-center space-x-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                  </svg>
                  <span>Continue Shopping</span>
                </Link>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-4 mt-12 lg:mt-0">
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({cartItems.length} items)</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className={shipping === 0 ? 'text-green-600 font-medium' : ''}>
                      {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  {subtotal < 50 && shipping > 0 && (
                    <p className="text-sm text-gray-500 bg-blue-50 p-3 rounded-lg">
                      💡 Add ${(50 - subtotal).toFixed(2)} more for free shipping!
                    </p>
                  )}
                  <hr className="border-gray-200" />
                  <div className="flex justify-between text-xl font-bold text-gray-900">
                    <span>Total</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                </div>

                <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 mb-4 flex items-center justify-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span>Secure Checkout</span>
                </button>

                <div className="text-center text-sm text-gray-500">
                  <p className="mb-2">🔒 Secure SSL encrypted checkout</p>
                  <p>💳 We accept all major credit cards</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Clear Cart Confirmation Modal */}
      {showClearConfirm && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl p-6 max-w-sm w-full">
            <div className="text-center">
              <div className="text-4xl mb-4">🗑️</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Clear Your Cart?</h3>
              <p className="text-gray-600 mb-6">
                This will remove all items from your cart. This action cannot be undone.
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowClearConfirm(false)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 px-4 rounded-lg transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleClearCart}
                  className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;