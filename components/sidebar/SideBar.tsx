// src/components/layout/Sidebar.tsx
import React, { useState } from "react";
import {
  Home,
  BarChart3,
  Users,
  FileText,
  Calendar,
  Mail,
  CreditCard,
  Settings,
  HelpCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useLayout } from "@/contexts/LayoutContext";

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  href: string;
  badge?: string;
  hasSubmenu?: boolean;
}

export const Sidebar: React.FC = () => {
  const { sidebarCollapsed, setSidebarCollapsed, isMobile } = useLayout();
  const router = useRouter();
  const [activeItem, setActiveItem] = useState(router.pathname);

  const menuItems: SidebarItem[] = [
    { id: "dashboard", label: "Dashboard", icon: Home, href: "/dashboard" },
    {
      id: "analytics",
      label: "Analytics",
      icon: BarChart3,
      href: "/analytics",
    },
    {
      id: "projects",
      label: "Projects",
      icon: FileText,
      href: "/projects",
      badge: "12",
    },
    { id: "team", label: "Team", icon: Users, href: "/team" },
    {
      id: "calendar",
      label: "Calendar",
      icon: Calendar,
      href: "/calendar",
      badge: "3",
    },
    {
      id: "messages",
      label: "Messages",
      icon: Mail,
      href: "/messages",
      badge: "5",
    },
  ];

  const handleNavigation = (href: string, id: string) => {
    setActiveItem(href);
    router.push(href);
    if (isMobile) {
      setSidebarCollapsed(true);
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && !sidebarCollapsed && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarCollapsed(true)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
        fixed top-16 left-0 h-[calc(100vh-4rem)] bg-white border-r border-gray-200 
        ${
          sidebarCollapsed ? "w-16" : "w-64"
        } transition-all duration-300 z-30 flex flex-col
        ${isMobile && sidebarCollapsed ? "-translate-x-full" : "translate-x-0"}
      `}
      >
        <nav className="flex-1 p-3 overflow-y-auto">
          <div className="space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.href, item.id)}
                className={`w-full flex items-center px-3 py-2.5 rounded-lg transition-all ${
                  activeItem === item.href
                    ? "bg-blue-600 text-white shadow-lg"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <item.icon
                  size={20}
                  className={`${sidebarCollapsed ? "mx-auto" : "mr-3"}`}
                />

                {!sidebarCollapsed && (
                  <>
                    <span className="flex-1 text-left font-medium">
                      {item.label}
                    </span>
                    {item.badge && (
                      <span
                        className={`px-2 py-0.5 text-xs rounded-full ${
                          activeItem === item.href
                            ? "bg-white/20 text-white"
                            : "bg-blue-100 text-blue-600"
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </button>
            ))}
          </div>
        </nav>
      </aside>
    </>
  );
};
