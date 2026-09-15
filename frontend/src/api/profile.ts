interface Profile {
    firstname: string;
    lastname: string;
    country: string;
    organization: string;
    education: string;
    industry: string;
    phone: string;
    website: string;
}

export async function getProfile(): Promise<Profile | null> {
    const response = await fetch("/api/profile", {
        credentials: "include",
    });

    if (response.status === 404) {
        return null;
    }

    if (!response.ok) {
        throw new Error("Failed to fetch profile");
    }

    return response.json() as Promise<Profile>;
}

export async function createProfile(data: Profile): Promise<Profile> {
    const response = await fetch("/api/profile", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error("Failed to create profile");
    }

    return response.json() as Promise<Profile>;
}

export async function updateProfile(data: Profile): Promise<Profile> {
    const response = await fetch("/api/profile", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error("Failed to update profile");
    }

    return response.json() as Promise<Profile>;
}
