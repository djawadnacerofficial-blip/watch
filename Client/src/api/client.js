export const API = async (url, options = {}, errorMessage = "Request failed") => {
    const res = await fetch(url, {
        credentials: "include",
        ...options
    })

    const data = await res.json().catch(() => ({}))

    if (!res.ok) { throw new Error(data.error || errorMessage) }

    return data
}