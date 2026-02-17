import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import toast from "react-hot-toast";
import type {
  AuthContextType,
  LoginCredentials,
  SignUpData,
  User,
} from "../utils/types";
import { authAPI } from "../api/authApi";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const storedToken = localStorage.getItem("token");
  const storedUser = localStorage.getItem("user");
  const parsedUser: User | null = storedUser ? JSON.parse(storedUser) : null;

  const [user, setUser] = useState<User | null>(parsedUser);
  const [token, setToken] = useState<string | null>(storedToken);

  const login = async (credentials: LoginCredentials) => {
    try {
      const response = await authAPI.login(credentials);
      const { token, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      setToken(token);
      setUser(user);

      toast.success("Login successful!");
    } catch (error) {
      console.log(error);
      toast.error("Login failed");
      throw error;
    }
  };

  const signup = async (data: SignUpData) => {
    try {
      const response = await authAPI.signup(data);
      const { token, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      setToken(token);
      setUser(user);

      toast.success("Account created successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Signup failed");
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    toast.success("Logged out successfully");
  };

  return (
    <AuthContext.Provider
      value={{ user, token, login, signup, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
