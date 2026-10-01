const API_URL = import.meta.env.VITE_API_URL

interface About {
    _id: string,
    about: string,
    createdAt: string,
    updatedAt: string
}

export type AboutInput = Omit<About | "_id" | "createdAt", |"updatedAt">

export async function getAbout(): Promise<About> {
    const response = await fetch(`${API_URL}/about`, {
        credentials: "include"
    })

    if(!response.ok) {
        throw new Error("Failed to load about details")
    }

    return response.json()
}

export async function createAbout(data: AboutInput): Promise<About> {
    const response = await fetch(`${API_URL}/about`, {

        method: "POST",
        credentials: "include",
        headers: {
            "Content-type" : "application/json"
        },
        body: JSON.stringify(data)
        
    })

    if(!response.ok) {
        throw new Error("Failed to create about details")
    }

    return response.json()
}

export async function updateAbout(_id: string, data: AboutInput): Promise<About> {
    const response = await fetch(`${API_URL}/about/id`, {

        method: "PATCH",
        credentials: "include",
        headers: {
            "Content-type" : "application/json"
        },
        body: JSON.stringify(data)
    })

    if(!response.ok) {
        throw new Error("Failed to update about details")
    }

    return response.json()
}