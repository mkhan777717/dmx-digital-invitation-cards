import { createContext, useContext, useState, useEffect } from "react";
import { authService } from "../services/auth.service";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check cached session user on load
    const cachedUser = authService.getCurrentUser();
    if (cachedUser) {
      setUser(cachedUser);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      await authService.login(email, password);
      const loggedUser = authService.getCurrentUser();
      setUser(loggedUser);
      return loggedUser;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userName, email, password) => {
    setLoading(true);
    try {
      await authService.register(userName, email, password);
      // Automatically log in on signup or redirect to login.
      // Since backend doesn't automatically issue cookies on register (it returns 201),
      // we can ask them to login, or login automatically.
      // Let's prompt user to login, or simulate auto-login by calling login internally if we want.
      // Let's just do a normal login or register return.
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await authService.logout();
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
