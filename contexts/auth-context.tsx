import { User } from "@/types/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { PropsWithChildren, useEffect, useState } from "react";
import { createContext } from "./create-context";

type AuthContextState = {
  user?: User,
  login: () => Promise<User>,
  logout: () => Promise<void>,
  isAuthenticated: boolean,
  isLoading: boolean
}

type JwtPayload = {
  iss: string,
  user: User
}

const { ContextProvider, useContext } = createContext<AuthContextState>();

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getTokenAsync = async () => {
      try {
        await login();
      } catch (err) {
        console.error("[useAuthContext] - Erro ao tentar autenticar usuário no inicio da aplicação: ",err);
        await logout();

      } finally {
        setIsLoading(false);
      }

    }

    setIsLoading(true);
    getTokenAsync();
    // eslint-disable-next-line
  }, []);

  const decodeAccessToken = async (accessToken: string) => {
    const decoded = jwtDecode<JwtPayload>(accessToken);
    return decoded.user;
  }

  const login = async () => {
    const accessToken = await AsyncStorage.getItem("accessToken");
    if (accessToken === null) throw new Error("No access token in storage");
    const decodedUser = await decodeAccessToken(accessToken);
    setUser(decodedUser);
    return decodedUser;
  }

  const logout = async () => {
    await AsyncStorage.removeItem("accessToken");
    setUser(undefined);
  }

  const isAuthenticated = user !== undefined;

  return (
    <ContextProvider value={{ login, logout, user, isAuthenticated, isLoading }}>
      {children}
    </ContextProvider>
  )
}

export const useAuthContext = useContext;