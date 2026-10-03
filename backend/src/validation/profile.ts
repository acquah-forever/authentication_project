import { z } from "zod" 

export const profileSchema = z.object({

    firstName: z.string().min(1, "Inavlid Parameters"),
    lastName: z.string().min(1, "Inavlid Parameters"),
    country: z.string().min(1, "Inavlid Parameters"),
    organization: z.string().min(1, "Inavlid Parameters"),
    education: z.string().min(1, "Inavlid Parameters"),
    industry: z.string().min(1, "Inavlid Parameters"),
    phoneNumber: z.string().min(1, "Inavlid Parameters"),
    website: z.string().min(1, "Invalid Parameters")

})

export type ProfileInput = z.infer<typeof profileSchema>;
