import type { components } from "@/types/openapi-types";

export type Lecture = Required<components["schemas"]["LectureDTO"]>;

export type Tag = Required<components["schemas"]["CategoryTag"]>;

export type Metrics = Required<components["schemas"]["LectureMetricsDTO"]>;