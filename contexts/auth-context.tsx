import { fetchUser } from "@/lib/apis/auth-api";
import { User } from "@/types/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PropsWithChildren, useEffect, useState } from "react";
import { createContext } from "./create-context";

type AuthContextState = {
  user?: User,
  login: (userAccessToken: string) => Promise<User>,
  logout: () => Promise<void>,
  isAuthenticated: boolean,
  isLoading: boolean
}

const { ContextProvider, useContext } = createContext<AuthContextState>();

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getTokenAsync = async () => {
      let userAccessToken: string | null;

      try {
        userAccessToken = await AsyncStorage.getItem("accessToken");
        if (userAccessToken === null) {
          throw new Error("No access token in storage");
        }
        await login(userAccessToken);

      } catch (err) {
        console.log(err);
        await logout();

      } finally {
        setIsLoading(false);
      }

    }

    setIsLoading(true);
    getTokenAsync();
    // eslint-disable-next-line
  }, []);

  const getUserFromAccessToken = async (accessToken: string) => {
    const user = await fetchUser(accessToken);
    return user;
  }

  const login = async (userAccessToken: string) => {
    const user = await getUserFromAccessToken(userAccessToken);
    await AsyncStorage.setItem("accessToken", userAccessToken);
    setUser(user);
    return user;
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