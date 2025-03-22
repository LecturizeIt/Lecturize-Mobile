import { fetchUser } from "@/lib/apis/auth-api";
import { User } from "@/types/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PropsWithChildren, useEffect, useState } from "react";
import { createContext } from "./create-context";

type AuthContextState = {
  user?: User,
  login: (userAccessToken: string) => Promise<User>,
  register: () => void,
  logout: () => void
}

const { ContextProvider, useContext } = createContext<AuthContextState>();

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const getTokenAsync = async () => {
      let userAccessToken: string | null;
      
      try {
        userAccessToken = await AsyncStorage.getItem("accessToken");
        if (userAccessToken === null) {
          throw new Error("No access token in storage");
        }
      } catch (err) {
        console.log(err);
        logout();
        return;
      }

      await login(userAccessToken);
    }

    getTokenAsync();
  }, []);

  const login = async (userAccessToken: string) => {
    const user = await getUserFromAccessToken(userAccessToken);
    await AsyncStorage.setItem("accessToken", userAccessToken);
    setUser(user);
    return user;
  }

  const getUserFromAccessToken = async (accessToken: string) => {
    const user = await fetchUser(accessToken);
    return user;
  }

  const logout = async () => { 
    AsyncStorage.removeItem("accessToken");
    setUser(undefined);
  }

  const register = () => { }
  

  return (
    <ContextProvider value={{ login, logout, register, user }}>
      {children}
    </ContextProvider>
  )
}

export const useAuthContext = useContext;