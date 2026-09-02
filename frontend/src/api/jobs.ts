const API_URL = import.meta.env.VITE_API_URL;

export async function getJobs() {
    const response = await fetch(`${API_URL}/jobs`);

    if (!response.ok) {
        throw new Error("Failed to fetch jobs");
    }

    return response.json();
};

export async function getJobById(jobId: string) {
    const response = await fetch(`${API_URL}/jobs/${jobId}`);

    if (!response.ok) {
        throw new Error("Failed to fetch job");
    }

    return response.json();
};