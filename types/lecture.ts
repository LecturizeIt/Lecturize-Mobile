import type { components } from "@/types/openapi-types";

// export type Lecture = Omit<Required<components["schemas"]["LectureDTO"]>, "tags"> & { tags: Tag[] };
export type Lecture = Required<components["schemas"]["LectureDTO"]>;

export type Tag = components["schemas"]["CategoryTag"];

export type Metrics = Required<components["schemas"]["LectureMetricsDTO"]>;

export type LectureImageResponse = Required<components["schemas"]["LectureImageDTO"]>;

