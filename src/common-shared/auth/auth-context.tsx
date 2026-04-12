import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { Loader2 } from "lucide-react";
import { getCurrentUser } from "../service/apiClient";

type UserState = {
  isAuthenticated: boolean;
  role: string | null;
};

type AuthContextType = {
  user: UserState;
  setUser: React.Dispatch<React.SetStateAction<UserState>>;
  isLoading: boolean;
  refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const INITIAL_USER_STATE: UserState = {
  isAuthenticated: false,
  role: null,
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserState>(INITIAL_USER_STATE);
  const [isLoading, setIsLoading] = useState(true);

  const refreshUser = async () => {
    try {
      const response = await getCurrentUser();
      setUser({
        isAuthenticated: true,
        role: response.data?.role || null,
      });
    } catch (_error) {
      setUser(INITIAL_USER_STATE);
    }
  };

  useEffect(() => {
    const verifyUser = async () => {
      try {
        await refreshUser();
      } finally {
        setIsLoading(false);
      }
    };

    verifyUser();
  }, []);

  const value = useMemo(
    () => ({
      user,
      setUser,
      isLoading,
      refreshUser,
    }),
    [user, isLoading],
  );

  if (isLoading) {
    return (
      <div className="min-h-screen w-full bg-slate-50 flex items-center justify-center p-6">
        <div className="w-full max-w-sm bg-white border border-slate-200 rounded-2xl shadow-sm p-8 flex flex-col items-center">
          <div className="w-14 h-14 rounded-full border border-slate-200 bg-slate-50 flex items-center justify-center">
            <Loader2 className="w-7 h-7 text-[#3a6845] animate-spin" />
          </div>
          <h2 className="mt-4 text-lg font-bold text-slate-900 tracking-tight">Please wait</h2>
          <p className="mt-1 text-sm text-slate-500 font-medium text-center">
            Checking your authentication status...
          </p>
        </div>
      </div>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};
