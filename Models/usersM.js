import { query } from "../Database.js"


export async function myProfile(userId) {
    try {

        const sql = `SELECT userID, username, email, "profilePhoto", "textBio", "tasteTags", "appearanceMode", createdat FROM users WHERE "userID" = $1`
        const user = await query(sql, [userId])
        return user

    } catch (err) {
        throw err
    }
}

export async function profile(username) {
    try {

        const sql = `SELECT username, "profilePhoto", "textBio", "tasteTags", createdat FROM users WHERE username = $1`
        const user = await query(sql,[username])
        return user

    } catch (err) {
        throw err
    }
    
}

export async function updateProfile(params) {
    
}