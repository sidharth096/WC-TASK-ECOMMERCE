"use client";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
            {/* Hero Content */}
            <div className="lg:col-span-6 text-center lg:text-left">
              <div className="animate-fade-in">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                  Welcome to{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                    MyStore
                  </span>{" "}
                  🛍️
                </h1>
                <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0">
                  Discover amazing products, unbeatable prices, and shopping experiences that'll make you smile
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12 animate-fade-in delay-300">
                <Link
                  href="/products"
                  className="group bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center justify-center space-x-2"
                >
                  <span>Shop Now</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                
                <button className="bg-white hover:bg-gray-50 text-gray-700 font-semibold py-4 px-8 rounded-xl border-2 border-gray-200 hover:border-indigo-300 transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v3a3 3 0 003 3z" />
                  </svg>
                  <span>Learn More</span>
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 animate-fade-in delay-500">
                <div className="text-center lg:text-left">
                  <div className="text-2xl md:text-3xl font-bold text-indigo-600">10K+</div>
                  <div className="text-gray-600">Happy Customers</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-2xl md:text-3xl font-bold text-purple-600">500+</div>
                  <div className="text-gray-600">Products</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-2xl md:text-3xl font-bold text-pink-600">99%</div>
                  <div className="text-gray-600">Satisfaction</div>
                </div>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="lg:col-span-6 mt-12 lg:mt-0 animate-fade-in delay-700">
              <div className="relative">
                {/* Main Shopping Illustration */}
                <div className="relative mx-auto w-80 h-80 md:w-96 md:h-96">
                  {/* Shopping Bags */}
                  <div className="absolute top-8 left-8 w-24 h-32 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-t-2xl shadow-2xl transform -rotate-12 animate-float">
                    <div className="w-4 h-4 bg-white rounded-full absolute top-4 left-4 opacity-80"></div>
                    <div className="w-3 h-3 bg-indigo-200 rounded-full absolute top-6 right-4 opacity-60"></div>
                    <div className="w-16 h-2 bg-indigo-800 rounded-full absolute top-2 left-1/2 transform -translate-x-1/2"></div>
                  </div>
                  
                  <div className="absolute top-4 right-12 w-28 h-36 bg-gradient-to-br from-purple-400 to-purple-600 rounded-t-2xl shadow-2xl transform rotate-6 animate-float delay-300">
                    <div className="w-5 h-5 bg-white rounded-full absolute top-4 left-4 opacity-80"></div>
                    <div className="w-3 h-3 bg-purple-200 rounded-full absolute top-6 right-4 opacity-60"></div>
                    <div className="w-18 h-2 bg-purple-800 rounded-full absolute top-2 left-1/2 transform -translate-x-1/2"></div>
                  </div>
                  
                  <div className="absolute bottom-12 left-16 w-20 h-28 bg-gradient-to-br from-pink-400 to-pink-600 rounded-t-2xl shadow-2xl transform rotate-12 animate-float delay-700">
                    <div className="w-4 h-4 bg-white rounded-full absolute top-3 left-3 opacity-80"></div>
                    <div className="w-14 h-2 bg-pink-800 rounded-full absolute top-2 left-1/2 transform -translate-x-1/2"></div>
                  </div>

                  {/* Shopping Cart */}
                  <div className="absolute bottom-8 right-8 w-32 h-24 animate-pulse">
                    <div className="w-24 h-16 bg-gradient-to-r from-gray-600 to-gray-800 rounded-lg shadow-xl">
                      <div className="w-4 h-4 bg-gray-800 rounded-full absolute -top-1 left-2"></div>
                      <div className="w-4 h-4 bg-gray-800 rounded-full absolute -top-1 right-2"></div>
                      <div className="w-3 h-3 bg-gray-300 rounded-full absolute bottom-2 left-2"></div>
                      <div className="w-3 h-3 bg-gray-300 rounded-full absolute bottom-2 right-2"></div>
                    </div>
                  </div>

                  {/* Floating Elements */}
                  <div className="absolute top-16 right-4 w-8 h-8 bg-yellow-400 rounded-full animate-bounce opacity-80"></div>
                  <div className="absolute bottom-24 left-4 w-6 h-6 bg-green-400 rounded-full animate-bounce delay-500 opacity-70"></div>
                  <div className="absolute top-32 left-32 w-4 h-4 bg-red-400 rounded-full animate-bounce delay-1000 opacity-60"></div>
                  
                  {/* Stars */}
                  <div className="absolute top-12 left-20 text-yellow-400 text-2xl animate-twinkle">⭐</div>
                  <div className="absolute bottom-32 right-20 text-yellow-400 text-lg animate-twinkle delay-700">✨</div>
                  <div className="absolute top-24 right-6 text-yellow-400 text-xl animate-twinkle delay-300">💫</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-40 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Shop With Us?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're committed to making your shopping experience exceptional
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-indigo-50 to-indigo-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4-8-4m16 0v10l-8 4-8-4V7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Free Shipping</h3>
              <p className="text-gray-600">
                Free shipping on all orders over $50. Fast and reliable delivery to your doorstep.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Quality Guaranteed</h3>
              <p className="text-gray-600">
                30-day money-back guarantee. If you're not satisfied, we'll make it right.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-pink-50 to-pink-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-16 h-16 bg-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 109.75 9.75A9.75 9.75 0 0012 2.25z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">24/7 Support</h3>
              <p className="text-gray-600">
                Our friendly support team is always here to help with any questions or concerns.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Start Shopping? 🎉
          </h2>
          <p className="text-xl text-indigo-100 mb-8">
            Join thousands of happy customers and discover your next favorite product today!
          </p>
          <Link
            href="/products"
            className="inline-flex items-center bg-white hover:bg-gray-100 text-indigo-600 font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl space-x-2"
          >
            <span>Explore Products</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(var(--rotation, 0deg)); }
          50% { transform: translateY(-10px) rotate(var(--rotation, 0deg)); }
        }
        
        @keyframes twinkle {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        
        .animate-fade-in { animation: fade-in 0.8s ease-out forwards; }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-twinkle { animation: twinkle 2s ease-in-out infinite; }
        .animate-blob { animation: blob 7s infinite; }
        
        .delay-300 { animation-delay: 300ms; }
        .delay-500 { animation-delay: 500ms; }
        .delay-700 { animation-delay: 700ms; }
        .delay-1000 { animation-delay: 1000ms; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>
    </div>
  );
}