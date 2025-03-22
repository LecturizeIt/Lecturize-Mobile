import axios from 'axios';
import { LoginFormValues } from '../schemas/login-schema';
import { LoginResponse, User } from '@/types/auth';

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

export const fetchUser = async (jwt: string): Promise<User> => {
  const result = await axios.get(`${BASE_URL}/user`, {
    headers: {"Authorization": `Bearer ${jwt}`}
  });
  return result.data;
}

export const login = async (loginBody: LoginFormValues): Promise<LoginResponse> => {
  const result = await axios.post(`${BASE_URL}/auth/login`, loginBody);
  return result.data;
}