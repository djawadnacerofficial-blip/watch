import { API } from "./client"

const POSTS_BASE_URL = "/api/posts"


export function getPosts() {
    return API(`${POSTS_BASE_URL}`)
}

export function createPost(post) {
    return API(`${POSTS_BASE_URL}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(post)
    })
}

export function updatePost(postId ,post) {
    return API(`${POSTS_BASE_URL}/${postId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(post)
    })
}

export function deletePost(postId) {
    return API(`${POSTS_BASE_URL}/${postId}`, {
        method: "DELETE",
    })
}

export function getComments(postId) {
    return API(`${POSTS_BASE_URL}/${postId}/comments`)
}

export function createComment(postId, comment) {
    return API(`${POSTS_BASE_URL}/${postId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(comment)
    })
}