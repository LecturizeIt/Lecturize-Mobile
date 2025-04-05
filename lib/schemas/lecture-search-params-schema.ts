import { z } from "zod";

export const allowedValues = {
  sort: ["createdAt,asc", "metrics.timesVisited,desc", "metrics.timesShared,desc"]
} as const;

export const LectureSearchParamsSchema = z.object({
  q: z.string().catch(""),
  sort: z.enum(allowedValues.sort).catch(allowedValues.sort[0]),
  tags: z.string().catch(""),
  lecturer: z.string().catch(""),
  size: z.number().gt(0).catch(10),
});

export type LectureSearchParams = z.infer<typeof LectureSearchParamsSchema>;