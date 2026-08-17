import { API } from './client.js'

const USERS_BASE_URL = "http://localhost:5000/api/users"



export function getMyProfile() {
            return API(`${USERS_BASE_URL}/me`)
}

export function getUserProfile(username) {
    return API(`${USERS_BASE_URL}/${username}`)
}

export function updateMyProfile(updates) {
    return API(`${USERS_BASE_URL}/me`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates)})
}


export function updateTags(tags) {
    return API(`${USERS_BASE_URL}/me/tags`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({tags})
    })
}


export function deleteTags(tags) {
    return API(`${USERS_BASE_URL}/me/tags`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({tags})
    })
}

export function updateProfileImg(img) {
        const formData = new FormData()
        formData.append("profilePhoto", img)

        return API(`${USERS_BASE_URL}/me/profile-photo`, {
            method: "PATCH",
            body: formData
        })
}

export function deleteProfileImg() {
    return API(`${USERS_BASE_URL}/me/profile-photo`, {
        method: "DELETE",
    })
}
