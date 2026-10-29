import { API } from "./client"

const AUTH_BASE_URL = "/api/auth"

export function signup(user) {
    return API(`${AUTH_BASE_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user)
    })
}

export function login(identifier, password) {
    return API(`${AUTH_BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password })
    })
}

export function logout() {
    return API(`${AUTH_BASE_URL}/logout`, {
        method: "POST"
    })
}
