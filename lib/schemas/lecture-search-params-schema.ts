import { z } from "zod";

export enum SortKey {
  MOST_VIEWED = "metrics.timesVisited,desc",
  MOST_SHARED = "metrics.timesShared,desc",
  NEWEST = "createdAt,desc"
}

export const allowedValues = {
  sort: [SortKey.NEWEST, SortKey.MOST_VIEWED, SortKey.MOST_SHARED],
} as const;


export const LectureSearchParamsSchema = z.object({
  q: z.string().catch(""),
  sort: z.enum(allowedValues.sort).catch(SortKey.NEWEST),
  tags: z.string().catch(""),
  lecturer: z.string().catch(""),
  size: z.number().gt(0).catch(10),
});

export type LectureSearchParams = z.infer<typeof LectureSearchParamsSchema>;