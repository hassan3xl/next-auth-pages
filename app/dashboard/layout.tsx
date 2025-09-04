"use client";

import { Navbar } from "@/components/navbar/Navbar";
import { Sidebar } from "@/components/sidebar/SideBar";
import { useAuth } from "@/contexts/AuthContext";
import { useLayout } from "@/contexts/LayoutContext";
import { useRouter } from "next/navigation";
import React from "react";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const { isAuthenticated } = useAuth();
  const { sidebarCollapsed, isMobile } = useLayout();
  const router = useRouter();

  const handleAuthAction = (action: "login" | "signup") => {
    router.push(`/auth/${action}`);
  };

  // Calculate main content margin
  const getMainContentStyle = () => {
    if (!isAuthenticated) return { marginLeft: 0 };
    if (isMobile) return { marginLeft: 0 };
    return { marginLeft: sidebarCollapsed ? "4rem" : "16rem" };
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onAuthAction={handleAuthAction} />

      {isAuthenticated && <Sidebar />}

      <main
        className="transition-all duration-300 pt-16 min-h-[calc(100vh-4rem)]"
        style={getMainContentStyle()}
      >
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
