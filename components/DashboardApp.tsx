// Main App with Layout Provider
"use client";

import { useEffect, useState } from "react";

const DashboardApp = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Toggle this to test auth states
  const [user, setUser] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
  });

  // Handle responsive behavior
  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (mobile) {
        setSidebarCollapsed(true);
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const authContextValue = {
    isAuthenticated,
    user: isAuthenticated ? user : null,
    login: () => setIsAuthenticated(true),
    logout: () => setIsAuthenticated(false),
  };

  const layoutContextValue = {
    sidebarCollapsed,
    setSidebarCollapsed,
    isMobile,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      <LayoutContext.Provider value={layoutContextValue}>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          {isAuthenticated && <SideBar />}
          <MainLayout>
            <DashboardContent />
          </MainLayout>

          {/* Demo Controls */}
          <div className="fixed bottom-4 right-4 bg-white rounded-xl shadow-lg border border-gray-200 p-4 z-50">
            <div className="text-sm font-medium text-gray-900 mb-3">
              Demo Controls
            </div>
            <div className="space-y-2">
              <button
                onClick={() => setIsAuthenticated(!isAuthenticated)}
                className={`w-full px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isAuthenticated
                    ? "bg-red-100 text-red-700 hover:bg-red-200"
                    : "bg-green-100 text-green-700 hover:bg-green-200"
                }`}
              >
                {isAuthenticated ? "Logout" : "Login"}
              </button>

              {isAuthenticated && (
                <button
                  onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                  className="w-full px-3 py-2 bg-blue-100 text-blue-700 hover:bg-blue-200 rounded-lg text-sm font-medium transition-colors"
                >
                  {sidebarCollapsed ? "Expand" : "Collapse"} Sidebar
                </button>
              )}
            </div>
          </div>
        </div>
      </LayoutContext.Provider>
    </AuthContext.Provider>
  );
};

export default DashboardApp;
