import type { components } from "@/types/openapi-types";

export type Lecture = Omit<Required<components["schemas"]["LectureDTO"]>, "tags"> & { tags: Tag[] };
// export type Lecture = Required<components["schemas"]["LectureDTO"]>;

export type Tag = { id: number, name: string };

export type Metrics = Required<components["schemas"]["LectureMetricsDTO"]>;

export type LectureImageResponse = Required<components["schemas"]["LectureImageDTO"]>;

export const enum LectureTypes {
  PRESENTIAL = "Presencial",
  HYRBID = "Híbrido",
  ONLINE = "Online"
}