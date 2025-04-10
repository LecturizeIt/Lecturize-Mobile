import { z } from "zod";

export const commentSchema = z.object({
  text: z.string().min(1, { message: "Comentário é necessário" }),
});

export type LectureCommentFormValues = z.infer<typeof commentSchema>;