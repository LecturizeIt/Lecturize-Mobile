import type { components } from "@/types/openapi-types";

export type Lecture = Omit<Required<components["schemas"]["LectureDTO"]>, "tags"> & { tags: Tag[] };

export type Tag = { id: number, name: string };

export type Metrics = Required<components["schemas"]["LectureMetricsDTO"]>;

export type LectureWithImage = Lecture & { image?: LectureImageResponse };

export type LectureImageResponse = Required<components["schemas"]["LectureImageDTO"]>;

export type PaginatedLectures = {
  results: Lecture[],
  totalItems: number,
  next: number | null,
  previous: number | null,
  currentPage: number,
} 

// export type 

export const enum LectureTypes {
  PRESENTIAL = "Presencial",
  HYRBID = "Híbrido",
  ONLINE = "Online"
}