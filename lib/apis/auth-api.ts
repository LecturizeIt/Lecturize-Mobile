import axios from 'axios';
import { LoginFormValues } from '../schemas/login-schema';
import { LoginResponse } from '@/types/auth';

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;
const JWT = `eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJsZWN0dXJpemUtaXQiLCJzdWIiOiJhYmNAZ21haWwuY29tIiwiZXhwIjoxNzQyNjc4MDk2LCJpYXQiOjE3NDI1OTE2OTYsInNjb3BlIjpbIlVTRVIiXX0.K2RhLY-gC25ijMCi7r-F_zIwkwJRjaUhb5DP1NYBzPcO1LJfk1xSh0nFau5q7bXe74JUpQLmyOFiYu0Ow2RElNVP8X8LL04F9dEaWlqiwE2dKfgWi8gwxo1-HnK_v0f265R-_N_svyOlOfF69rGcmpMM3hVzJ4PevNIW-TQV_g3PRWV8TSIBSt13Zd9MDduasSCRQbZKVDPQgSN5l12zbajJExsoJdphyfSFanxmxXlZNj60XQZTorYkpK4sDBSrSgNpOCbGvNUXWlwvWjdfGOxjvhOuK7zBYaqeYSkKlByixqY2vJKseplaZBtCzf5pJ7_NHabJRhdsvXssSYaZ7w`

export const fetchUser = async () => {
  const result = await axios.get(`${BASE_URL}/user`, {
    headers: {"Authorization": `Bearer ${JWT}`}
  });
  return result.data;
}

export const login = async (loginBody: LoginFormValues): Promise<LoginResponse> => {
  const result = await axios.post(`${BASE_URL}/auth/login`, loginBody);
  return result.data;
}