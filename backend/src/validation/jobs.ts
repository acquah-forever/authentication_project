import { z } from "zod";

export const createJobSchema = z.object({
    jobTitle: z.string().trim().min(1),
    company: z.string().trim().min(1),
    jobLocation: z.string().trim().min(1),
    employmentType: z.enum(["Part-Time", "Full-Time", "Contract", "Volunteer"]),
    experienceLevel: z.enum(["Entry-Level", "Junior", "Senior", "Manager"]),
    requirements: z.array(z.string().trim().min(1)).min(1),
    jobDescription: z.string().trim().min(1),
});

export type CreateJobInput = z.infer<typeof createJobSchema>;
