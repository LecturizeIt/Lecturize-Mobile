import { LectureSearchParamsSchema } from "@/lib/schemas/lecture-search-params-schema";
import { z } from "zod";
import { UserSummary } from "./auth";

export type LectureSummary = {
  id: string;
  title: string;
  lecturer: string;
  description: string;
  createdAt: string;
  startsAt: string;
  endsAt: string;
  type: LectureTypes;
  status: string;
  tags: string[];
  metrics: Metrics;
  image: LectureImage;
};

export type LectureImage = {
  fileName: string;
  description: string;
  contentType: string;
  size: number;
} | null


export type Tag = { id: number, name: string };

export type Metrics = {
  timesVisited: number;
  timesShared: number;
};

export type Lecture = Omit<LectureSummary, "tags"> & { 
  tags: Tag[];
  url: string | null;
  address: string | null;
  organizer: UserSummary;
  maximumCapacity: number | null;
};

export type PaginatedLectures = {
  results: LectureSummary[],
  totalItems: number,
  next: number | null,
  previous: number | null,
  currentPage: number,
}

export const enum LectureTypes {
  PRESENTIAL = "Presencial",
  HYBRID = "Híbrido",
  ONLINE = "Online"
}

export type LectureComment = {
  id: string;
  text: string;
  user: UserSummary;
  createdAt: string;
}

export type LectureSearchParamsParsed = z.infer<typeof LectureSearchParamsSchema>;
export type LectureSearchParams = Partial<Omit<LectureSearchParamsParsed, "sort"> & { sort: string }>;