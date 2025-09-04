// Main Authentication App Component
const AuthenticationApp = () => {
  const [currentPage, setCurrentPage] = useState("login");

  const pages = {
    login: LoginPage,
    signup: SignupPage,
    "forgot-password": ForgotPasswordPage,
    "verify-email": VerifyEmailPage,
    "reset-password": ResetPasswordPage,
    "password-success": PasswordSuccessPage,
    "two-factor-setup": TwoFactorSetupPage,
    "phone-verification": PhoneVerificationPage,
  };

  const CurrentPageComponent = pages[currentPage];

  return (
    <div className="font-sans antialiased">
      {/* Page Navigation for Demo */}
      <div className="fixed top-4 left-4 z-50 bg-white/90 backdrop-blur-sm rounded-xl p-3 shadow-lg border border-gray-200">
        <div className="flex flex-wrap gap-2">
          {Object.keys(pages).map((pageName) => (
            <button
              key={pageName}
              onClick={() => setCurrentPage(pageName)}
              className={`px-3 py-1 text-xs rounded-lg transition-colors ${
                currentPage === pageName
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {pageName
                .split("-")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}
            </button>
          ))}
        </div>
      </div>

      <CurrentPageComponent onPageChange={setCurrentPage} />
    </div>
  );
};

export default AuthenticationApp;
