import { AuthenticationResponse, Roles, User } from "@/types/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { AxiosError, HttpStatusCode } from "axios";
import { jwtDecode } from "jwt-decode";
import { PropsWithChildren, useEffect, useMemo, useState } from "react";
import { createContext } from "./create-context";

type AuthContextState = {
  user?: User,
  login: () => Promise<User>,
  logout: () => Promise<void>,
  isAuthenticated: boolean,
  isLoading: boolean,
  isAdmin: boolean
}

type JwtPayload = {
  iss: string,
  user: User
}

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

let failedRequestQueue: any[] = [];
let isRefreshing = false;

const { ContextProvider, useContext } = createContext<AuthContextState>();

const isTokenExpiredException = (error: AxiosError<any, any>) => {
  return (
    error.status === HttpStatusCode.Unauthorized 
    && error.response 
    && error.response?.data.properties 
    && error.response?.data.properties.isTokenInvalid
  );
}

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User>();
  const [isLoading, setIsLoading] = useState(true);

  // interceptor to refetch a new access token using the stored refresh token
  useMemo(() => {
    axios.interceptors.response.use((response) => {
      return response;
    }, async (error: AxiosError<any, any>) => {
      if (isTokenExpiredException(error)) {
        const refreshToken = await AsyncStorage.getItem("refreshToken");
        const originalConfig = error.config;
        console.log("Access token expired! Trying to fetch a new one using the stored refresh token...");
        if (!isRefreshing) {
          isRefreshing = true;
          axios
            .post(`${BASE_URL}/auth/refresh-token`, { refreshToken })
            .then(async (response) => {
              const { accessToken, refreshToken: newRefreshToken } = response.data as AuthenticationResponse;
              await AsyncStorage.setItem("accessToken", accessToken);
              await AsyncStorage.setItem("refreshToken", newRefreshToken);
              originalConfig!.headers["Authorization"] = `Bearer ${accessToken}`;
              console.log("New accessToken and refreshToken fetched successfully...");
              failedRequestQueue.forEach((request: any) =>
                request.onSuccess(accessToken)
              );
              failedRequestQueue = [];
            })
            .catch(async (err) => {
              failedRequestQueue.forEach((request: any) => request.onFailure(err));
              failedRequestQueue = [];
              await logout();
              console.log("Fetch of a new accessToken failed... ", err);
            })
            .finally(() => {
              isRefreshing = false
            });
        }
        return new Promise((resolve, reject) => {
          failedRequestQueue.push({
            onSuccess: (token: string) => {
              originalConfig!.headers["Authorization"] = `Bearer ${token}`;
              resolve(axios(originalConfig!));
            },
            onFailure: (error: AxiosError) => {
              reject(error);
            },
          });
        });
      }
      return Promise.reject(error);
    });
  }, []);

  useEffect(() => {
    const getTokenAsync = async () => {
      try {
        await login();
      } catch (err) {
        console.log("[useAuthContext] - Erro ao tentar autenticar usuário no inicio da aplicação: ", err);
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
    const refreshToken = await AsyncStorage.getItem("refreshToken");
    if (accessToken === null || refreshToken === null) throw new Error("No authentication tokens in storage");
    const decodedUser = await decodeAccessToken(accessToken);
    setUser(decodedUser);
    return decodedUser;
  }

  const logout = async () => {
    await AsyncStorage.removeItem("accessToken");
    await AsyncStorage.removeItem("refreshToken");
    setUser(undefined);
  }

  const isAuthenticated = user !== undefined;
  const isAdmin = !!(user?.roles.some(r => Roles.ADMIN === r));

  return (
    <ContextProvider value={{ login, logout, user, isAuthenticated, isLoading, isAdmin }}>
      {children}
    </ContextProvider>
  )
}

export const useAuthContext = useContext;