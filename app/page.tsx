import Link from "next/link";
import React from "react";

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center flex-1 text-center px-6 py-20">
        <h1 className="text-3xl">Your secure ToDo app</h1>
        {/* Call-to-Action Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <Link
            href="/auth/signup"
            className="px-8 py-3 rounded-2xl text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 transition"
          >
            Get Started
          </Link>
          <Link
            href="/auth/login"
            className="px-8 py-3 rounded-2xl text-lg font-semibold border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
          >
            Login
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center text-gray-500 text-sm border-t">
        © {new Date().getFullYear()} SecureToDo. All rights reserved.
      </footer>
    </div>
  );
};

export default HomePage;
