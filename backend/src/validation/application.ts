import { z } from "zod";

const skillLevel = z.enum([
    "",
    "beginner",
    "intermediate",
    "advanced",
    "expert",
]);

export const applicationSchema = z.object({
    job: z.string().min(1, "Job is required"),

    name: z.string().min(1, "Name is required"),

    email: z.string().email("Invalid email address"),

    phone: z.string().min(1, "Phone is required"),

    location: z.string().min(1, "Location is required"),

    linkedin: z.string(),

    github: z.string(),

    portfolio: z.string(),

    resume: z.string(),

    experience: z.string().min(1, "Experience is required"),

    strongest: z.string().min(1, "Strongest skill is required"),

    projectLink: z.string(),

    llm: z.string(),

    frontend: skillLevel,

    backend: skillLevel,

    databases: skillLevel,

    aiCodingTools: skillLevel,

    systems: z.string(),

    interest: z.string(),

    aiTools: z.string(),

    confirm1: z.boolean(),

    confirm2: z.boolean(),
});

export type ApplicationInput = z.infer<typeof applicationSchema>;