import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { House, ArrowRight } from "lucide-react";
import PageHeader from "../../common-shared/page-header/header";
import { useAuth } from "../../common-shared/auth/auth-context";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user.isAuthenticated) {
      navigate("/bins", { replace: true });
    }
  }, [navigate, user.isAuthenticated]);

  return (
    <div className="h-full w-full bg-slate-50 flex flex-col overflow-hidden">
      <div className="w-full flex flex-col p-4 sm:p-6 overflow-hidden">
        <PageHeader
          title="Welcome"
          description="Welcome to Waste Management. This is your home page."
          Icon={House}
        />

        <div className="w-full bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Welcome to Waste Management
          </h2>
          <p className="mt-2 text-slate-500 text-sm font-medium">
            Manage bins, drivers, trucks, and routes from one place.
          </p>
          <button
            onClick={() => navigate("/login")}
            className="mt-6 inline-flex items-center px-6 py-2.5 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-[#3a6845] hover:bg-[#2c5035] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3a6845] transition-all duration-200 group"
          >
            Login
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;