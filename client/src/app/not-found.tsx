import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center px-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Animated 404 Number */}
        <div className="relative mb-8">
          <div className="text-[200px] md:text-[300px] font-black text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text leading-none select-none animate-pulse">
            404
          </div>

          {/* Floating Elements */}
          <div className="absolute top-10 left-10 w-20 h-20 bg-indigo-200 rounded-full opacity-60 animate-bounce"></div>
          <div className="absolute top-20 right-16 w-16 h-16 bg-purple-200 rounded-full opacity-40 animate-bounce delay-300"></div>
          <div className="absolute bottom-10 left-20 w-12 h-12 bg-pink-200 rounded-full opacity-50 animate-bounce delay-700"></div>
          <div className="absolute bottom-16 right-10 w-24 h-24 bg-blue-200 rounded-full opacity-30 animate-bounce delay-1000"></div>
        </div>

        {/* Error Message */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4 animate-fade-in">
            Oops! Page Not Found
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-6 max-w-2xl mx-auto animate-fade-in delay-300">
            The page you&apos;re looking for seems to have wandered off into the
            digital wilderness.
          </p>
          <p className="text-lg text-gray-500 animate-fade-in delay-500">
            Don&apos;t worry, even the best explorers sometimes take a wrong turn!
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8 animate-fade-in delay-1000">
          <Link
            href="/"
            className="group bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center space-x-2"
          >
            <svg
              className="w-5 h-5 group-hover:animate-bounce"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            <span>Return Home</span>
          </Link>

          <Link
            href="/products"
            className="group bg-white hover:bg-gray-50 text-gray-700 font-semibold py-4 px-8 rounded-xl border-2 border-gray-200 hover:border-indigo-300 transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center space-x-2"
          >
            <svg
              className="w-5 h-5 group-hover:animate-pulse"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 12H6L5 9z"
              />
            </svg>
            <span>Browse Products</span>
          </Link>
        </div>
      </div>

      {/* Custom Styles for Animations */}
      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(45deg); }
          50% { transform: translateY(-10px) rotate(45deg); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        
        .animate-twinkle {
          animation: twinkle 2s ease-in-out infinite;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .delay-300 { animation-delay: 300ms; }
        .delay-500 { animation-delay: 500ms; }
        .delay-700 { animation-delay: 700ms; }
        .delay-1000 { animation-delay: 1000ms; }
        .delay-1200 { animation-delay: 1200ms; }
        .delay-1500 { animation-delay: 1500ms; }
      `}</style>
    </div>
  );
}
