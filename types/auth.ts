import type { components } from "@/types/openapi-types";

export type User = Required<components["schemas"]["UserSummaryDTO"]>;

export type LoginResponse = Required<components["schemas"]["LoginDTO"]>;

