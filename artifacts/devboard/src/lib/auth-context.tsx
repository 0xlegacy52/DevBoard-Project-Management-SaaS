import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";

interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string | null;
  emailVerified?: boolean;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isLoading: boolean;
}

interface AuthContextValue extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  setAuth: (user: User, accessToken: string) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const TOKEN_KEY = "devboard_access_token";
const REFRESH_TOKEN_KEY = "devboard_refresh_token";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    accessToken: null,
    isLoading: true,
  });

  const setAuth = useCallback((user: User, accessToken: string) => {
    setState({ user, accessToken, isLoading: false });
  }, []);

  const fetchMe = useCallback(async (token: string) => {
    const res = await fetch("/api/v1/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error("Not authenticated");
    return res.json() as Promise<User>;
  }, []);

  const tryRefresh = useCallback(async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
    if (!refreshToken) return false;

    const res = await fetch("/api/v1/auth/refresh", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });
    if (!res.ok) {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(REFRESH_TOKEN_KEY);
      return false;
    }
    const data = (await res.json()) as { accessToken: string; refreshToken: string };
    localStorage.setItem(TOKEN_KEY, data.accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, data.refreshToken);
    return data.accessToken;
  }, []);

  useEffect(() => {
    const init = async () => {
      let token = localStorage.getItem(TOKEN_KEY);
      if (!token) {
        const refreshed = await tryRefresh();
        if (!refreshed) {
          setState((s) => ({ ...s, isLoading: false }));
          return;
        }
        token = refreshed as string;
      }
      try {
        const user = await fetchMe(token);
        setState({ user, accessToken: token, isLoading: false });
      } catch {
        const refreshed = await tryRefresh();
        if (refreshed) {
          try {
            const user = await fetchMe(refreshed as string);
            setState({ user, accessToken: refreshed as string, isLoading: false });
            return;
          } catch {
            /* falls through */
          }
        }
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(REFRESH_TOKEN_KEY);
        setState({ user: null, accessToken: null, isLoading: false });
      }
    };
    init();
  }, [fetchMe, tryRefresh]);

  const login = useCallback(async (email: string, password: string) => {
    const res = await fetch("/api/v1/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      const data = await res.json();
      throw new Error((data as { error?: string }).error ?? "Login failed");
    }
    const data = (await res.json()) as { user: User; accessToken: string; refreshToken: string };
    localStorage.setItem(TOKEN_KEY, data.accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, data.refreshToken);
    setState({ user: data.user, accessToken: data.accessToken, isLoading: false });
  }, []);

  const register = useCallback(async (name: string, email: string, password: string) => {
    const res = await fetch("/api/v1/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    if (!res.ok) {
      const data = await res.json();
      throw new Error((data as { error?: string }).error ?? "Registration failed");
    }
    const data = (await res.json()) as { user: User; accessToken: string; refreshToken: string };
    localStorage.setItem(TOKEN_KEY, data.accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, data.refreshToken);
    setState({ user: data.user, accessToken: data.accessToken, isLoading: false });
  }, []);

  const logout = useCallback(async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
    const token = state.accessToken;
    if (token) {
      await fetch("/api/v1/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ refreshToken }),
      }).catch(() => {});
    }
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    setState({ user: null, accessToken: null, isLoading: false });
  }, [state.accessToken]);

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
