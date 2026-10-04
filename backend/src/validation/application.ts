import { z } from "zod";

 z.enum(["","beginner","intermediate","advanced","expert"]);

export const applicationSchema = z.object({
    job: z.string().min(1, "Invalid Parameters"),

    name: z.string().min(1, "Invalid Parameters"),

    email: z.string().email("Invalid email address"),

    phone: z.string().min(1, "Invalid Parameters"),

    location: z.string().min(1, "Invalid Parameters"),

    linkedin: z.string(),

    github: z.string(),

    portfolio: z.string(),

    resume: z.string(),

    experience: z.string().min(1, "Invalid Parameters"),

    strongest: z.string().min(1, "Invalid Parameters"),

    projectLink: z.string(),

    llm: z.string(),

    frontend: z.enum(["","beginner","intermediate","advanced","expert"]),
    
    backend: z.enum(["","beginner","intermediate","advanced","expert"]),

    databases: z.enum(["","beginner","intermediate","advanced","expert"]),

    aiCodingTools: z.enum(["","beginner","intermediate","advanced","expert"]),

    systems: z.string(),

    interest: z.string(),

    aiTools: z.string(),

    confirm1: z.literal(true),

    confirm2: z.literal(true),
});

export type ApplicationInput = z.infer<typeof applicationSchema>;