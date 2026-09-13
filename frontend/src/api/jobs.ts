const API_URL = import.meta.env.VITE_API_URL;

export interface Job {
    _id: string;
    jobTitle: string;
    company: string;
    jobLocation: string;
    employmentType: string;
    experienceLevel: string;
    requirements: string[];
    jobDescription: string;
}

export async function getJobs(): Promise<Job[]> {
    const response = await fetch(`${API_URL}/jobs`);

    if (!response.ok) {
        throw new Error("Failed to Fetch jobs");
    }

    return response.json() as Promise<Job[]>;
};

export async function getJobById(jobId: string): Promise<Job> {
    const response = await fetch(`${API_URL}/jobs/${jobId}`);

    if (!response.ok) {
        throw new Error("Failed to Fetch job");
    }

    return response.json() as Promise<Job>;
};
