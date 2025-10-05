"use client";

import { Navbar } from "@/components/navbar/Navbar";
import { Sidebar } from "@/components/sidebar/SideBar";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();

  return (
    <div className="h-screen overflow-hidden">
      <div className="flex flex-col h-full">
        <nav className="shrink-0">
          <Navbar
            onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)}
            isSidebarOpen={isSidebarOpen}
          />
        </nav>

        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

        <main
          className={`grow overflow-auto transition-all duration-300 ${
            isSidebarOpen ? "md:ml-64" : "md:ml-20"
          }`}
        >
          <div className="p-6 text-white">{children}</div>
        </main>
      </div>
    </div>
  );
}
