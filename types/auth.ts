import type { components } from "@/types/openapi-types";

export type User = Required<components["schemas"]["UserDTO"]>;

export type LoginResponse = Required<components["schemas"]["LoginDTO"]>;

export enum Roles {
  ADMIN="Admin",
  USER="User"
};