const API_URL = import.meta.env.VITE_API_URL

type SkillLevel =
    | ""
    | "beginner"
    | "intermediate"
    | "advanced"
    | "expert"

interface Application {
    _id:string,
    user:string,
    job:string,
    name: string,
    email: string,
    phone: string,
    location: string,
    linkedin: string,
    github: string,
    portfolio: string,
    resume: string,
    experience: string,
    strongest: string,
    projectLink: string,
    llm: string,
    frontend: SkillLevel,
    backend: SkillLevel,
    databases: SkillLevel,
    aiCodingTools: SkillLevel,
    systems: string,
    interest: string,
    aiTools: string,
    confirm1: boolean,
    confirm2: boolean,
    createdAt: string,

}

export type ApplicationInput = Omit<Application, "_id" | "user" | "createdAt">

export async function createApplication(data: ApplicationInput): Promise<Application> {
    const response = await fetch(`${API_URL}/application`, {

        method: "POST",
        headers: {
            "Content-type" : "application/json"
        },
        credentials: "include",
        body: JSON.stringify(data)
    })

    if(!response.ok) {
        throw new Error("Failed to create job application")
    }

    return response.json()
}