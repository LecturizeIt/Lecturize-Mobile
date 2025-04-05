
export type User = {
  id: number;
  username: string;
  email: string;
  roles: string[];
};

export type UserSummary = {
  id: number;
  email: string;
  username: string;
};

export type LoginResponse = {
  accessToken: string;
  expiresIn: number;
};

export enum Roles {
  ADMIN = "ADMIN",
  USER = "USER"
};