import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
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
    let isMounted = true;

    const verifyUser = async () => {
      try {
        await refreshUser();
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    verifyUser();

    return () => {
      isMounted = false;
    };
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

  return (
    <AuthContext.Provider value={value}>
      {isLoading && (
        <div className="w-full h-1 bg-linear-to-r from-[#3a6845] to-[#63A361] animate-pulse fixed top-0 left-0 z-50" />
      )}
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};
