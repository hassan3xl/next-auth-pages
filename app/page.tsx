"use client";

import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const page = () => {
  const { user } = useAuth();

  return (
    <div className="mt-10 flex flex-col sm:flex-row gap-4">
      {user ? (
        <>
          <h1>You are logged in</h1>
          <Link
            href="/dashboard/"
            className="px-8 py-3 rounded-2xl text-lg font-semibold border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
          >
            dashboard
          </Link>
        </>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

export default page;
