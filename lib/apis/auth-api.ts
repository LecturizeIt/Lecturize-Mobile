import { LoginFormValues } from '@/lib/schemas/login-schema';
import { RegisterFormValues } from '@/lib/schemas/register-schema';
import { LoginResponse, User } from '@/types/auth';
import axios from 'axios';

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

export const fetchUser = async (accessToken: string): Promise<User> => {
  const result = await axios.get(`${BASE_URL}/user`, {
    headers: { "Authorization": `Bearer ${accessToken}` }
  });
  return result.data;
}

export const login = async (loginBody: LoginFormValues): Promise<LoginResponse> => {
  const result = await axios.post(`${BASE_URL}/auth/login`, loginBody);
  return result.data;
}

export const register = async (registerBody: RegisterFormValues): Promise<User> => {
  const result = await axios.post(`${BASE_URL}/auth/register`, registerBody);
  return result.data;
}