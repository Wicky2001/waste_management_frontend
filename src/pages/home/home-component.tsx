import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { House } from "lucide-react";
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
        </div>
      </div>
    </div>
  );
};

export default Home;