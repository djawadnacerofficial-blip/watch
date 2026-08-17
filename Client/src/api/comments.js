import { API } from "./client"

const COMMENTS_BASE_URL = "/api/comments"


export function updateComment(commentId, comment) {
    return API(`${COMMENTS_BASE_URL}/${commentId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(comment)
    })
}

export function deleteComment(commentId) {
    return API(`${COMMENTS_BASE_URL}/${commentId}`, {
        method: "DELETE"
    })
}