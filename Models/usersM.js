import { query } from "../Database.js"


export async function myProfile(userId) {
    try {

        const sql = `SELECT "userID", username, email, "profilePhoto", "textBio", "tasteTags", "appearanceMode", createdat FROM users WHERE "userID" = $1`
        return await query(sql, [userId])

    } catch (err) {
        throw err
    }
}

export async function profile(username) {
    try {

        const sql = `SELECT username, "profilePhoto", "textBio", "tasteTags", createdat FROM users WHERE username = $1`
        return await query(sql,[username])

    } catch (err) {
        throw err
    }
    
}

export async function updateProfile(updates, userId) {

    try {

        const allowedFields = ["username", "text_bio", "taste_tags"]

        const keys = Object.keys(updates)
            .filter(key => allowedFields.includes(key))
        
        if (keys.length === 0) {
            return null
        }

        const setCluase = keys
                            .map((key, index) => `${key} = $${index + 1}`)
                            .join(", ")

        const values = [...keys.map(key => updates[key]), userId]
        const userIdIndex = values.length

        const sql = `UPDATE users
                        SET ${setCluase}
                        WHERE "userID" = $${userIdIndex}
                    RETURNING username, "text_bio", "taste_tags"
                        `
        
        return await query(sql, values)
        
    } catch (err) {
        console.log(err)
        throw err
    }

}