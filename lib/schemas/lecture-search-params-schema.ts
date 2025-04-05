import { z } from "zod";

const allowedValues = {
  sort: ["createdAt,asc", "metrics.timesVisited,desc", "metrics.timesShared,desc"]
} as const;

export const LectureSearchParamsSchema = z.object({
  q: z.string().catch(""),
  sort: z.enum(allowedValues.sort).catch(allowedValues.sort[0]),
  tags: z.string().catch(""),
  lecturer: z.string().catch(""),
});

export type LectureSearchParams = z.infer<typeof LectureSearchParamsSchema>;