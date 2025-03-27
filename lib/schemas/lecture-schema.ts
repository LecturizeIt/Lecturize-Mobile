import { ACCEPTED_MIME_TYPES } from "@/constants";
import { isAfter } from "date-fns";
import { z } from "zod";


const MB_BYTES = 1_000_000;

const TypeEnum = z.enum(['PRESENTIAL', 'HYBRID', 'ONLINE']);

export const lectureSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),

  lecturer: z.string().min(1, { message: "Lecturer name is required" }),

  description: z.string().min(1, { message: "Description is required" }),

  startsAt: z.string().refine(date => isAfter(new Date(date), new Date()), {
    message: "Start date and time must be in the future"
  }),

  endsAt: z.string().refine(date => isAfter(new Date(date), new Date()), {
    message: "End date and time must be in the future"
  }),

  type: TypeEnum,

  url: z.string().optional(),

  address: z.string().optional(),

  maximumCapacity: z.number().optional().transform(val => val === 0 ? undefined : val),

  tags: z.array(z.object({
    id: z.number().int().positive({
      message: "must be a positive integer",
    }),
  })).optional(),

  image: z.any().optional()
  .superRefine((file, ctx) => {
    if (!file) return;

    if (!ACCEPTED_MIME_TYPES.includes(file.mimeType)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Image must be one of [${ACCEPTED_MIME_TYPES.join(", ")}] accepted types, but it was ${file.type}`,
      });
    }

    if (file.size >= MB_BYTES) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Image size must not be larger than ${MB_BYTES / MB_BYTES} MB`,
      });
    }
  }),
})
  .refine(data => new Date(data.endsAt) > new Date(data.startsAt), {
    message: "End date and time must be after the start date and time",
    path: ["endsAt"],
  }).superRefine((val, ctx) => {
    if (val.type === "HYBRID") {
      const issues: z.IssueData[] = validateHybridType(val.url, val.address, val.maximumCapacity);
      issues.forEach((issue) => ctx.addIssue(issue))
    }

    if (val.type === "ONLINE") {
      val.maximumCapacity = undefined;
      val.address = undefined;
      const issues: z.IssueData[] = [];
      validateOnlineType(val.url, issues);
      issues.forEach((issue) => ctx.addIssue(issue))
    }

    if (val.type === "PRESENTIAL") {
      val.url = undefined;
      const issues: z.IssueData[] = [];
      validatePresentialType(val.address, issues, val.maximumCapacity);
      issues.forEach((issue) => ctx.addIssue(issue))
    }

  })

function validateOnlineType(url: string | undefined, issues: z.IssueData[]) {
  if (url === "") {
    issues.push({
      code: z.ZodIssueCode.custom,
      message: "URL is required",
      path: ["url"]
    });
  }
}

function validatePresentialType(address: string | undefined, issues: z.IssueData[], maximumCapacity: number | undefined) {
  if (!address) {
    issues.push({
      code: z.ZodIssueCode.custom,
      message: "Address is required",
      path: ["address"]
    });
  }
  if (!maximumCapacity) {
    issues.push({
      code: z.ZodIssueCode.custom,
      message: "Maximum capacity is required",
      path: ["maximumCapacity"]
    });
  }
}


function validateHybridType(url?: string, address?: string, maximumCapacity?: number) {
  const issues: z.IssueData[] = [];
  validateOnlineType(url, issues);
  validatePresentialType(address, issues, maximumCapacity);
  return issues;
}

export type LectureFormValues = z.infer<typeof lectureSchema>;