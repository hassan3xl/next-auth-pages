import { useAuth } from "@/contexts/AuthContext";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { apiService } from "@/services/apiService";
import Loader from "../Loader";
import { resetAuthCookies } from "@/lib/actions";
import { Button } from "../ui/button";

interface UserNavProps {
  email: string;
  fullname: string;
}

const UserNav = ({ email, fullname }: UserNavProps) => {
  const { user, loading } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-2">
        <Loader variant="ring" color="white" size={16} />
      </div>
    );
  }
  console.log("user", user);

  if (!user) {
    return (
      <div className="flex items-center space-x-4">
        <a
          href="/auth/login"
          className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-accent-hover transition-colors duration-200 hover:bg-gray-700 rounded-lg"
        >
          Login
        </a>
        <a
          href="/auth/signup"
          className="px-4 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
        >
          Sign Up
        </a>
      </div>
    );
  }
  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center space-x-3 p-2 rounded-lg hover:bg-tertiary border-accent transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
      >
        {/* User Info */}
        <div className=" text-left">
          <p className="text-sm font-medium text-gray-200 truncate max-w-32">
            {user.email}
          </p>
        </div>

        {/* Chevron Icon */}
        <svg
          className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
            isDropdownOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-secondary border border-tertiary rounded-lg shadow-lg z-50 py-1">
          {/* User Info Header */}
          <div className="px-4 py-3 border-b border-gray-700">
            <p className="text-sm text-gray-400">Signed in as</p>
            <p className="text-sm font-medium text-gray-200 truncate">
              {user.email}
            </p>
          </div>

          {/* Menu Items */}
          <div className="py-1">
            <Link
              href="/dashboard"
              className="flex items-center px-4 py-2 text-sm  hover:bg-accent-hover"
            >
              dashboard
            </Link>
            <Link
              href="/profile"
              className="flex items-center px-4 py-2 text-sm  hover:bg-accent-hover"
            >
              Profile
            </Link>
            <Link
              href="/projects"
              className="flex items-center px-4 py-2 text-sm  hover:bg-accent-hover"
            >
              Projects
            </Link>
            <Link
              href="/archieves"
              className="flex items-center px-4 py-2 text-sm  hover:bg-accent-hover"
            >
              Archieves
            </Link>
            <Link
              href="/settings"
              className="flex items-center px-4 py-2 text-sm  hover:bg-accent-hover"
            >
              Settings
            </Link>
            <Link
              href="/help"
              className="flex items-center px-4 py-2 text-sm  hover:bg-accent-hover"
            >
              Help & Support
            </Link>
            <Button
              onClick={() => {
                resetAuthCookies();
              }}
              className="w-full border bg-red-800 hover:bg-red-700"
            >
              Sign Out
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserNav;
