import { query } from "../db/Database.js"

export const LIST_TYPES = ["favorite", "watch_later", "watched"]

export async function addToListM(userId, { tmdb_id, list_type, movie_title, poster_path }) {
    const sql = `
        INSERT INTO list_items ("userID", tmdb_id, list_type, movie_title, poster_path)
        VALUES ($1, $2, $3, $4, $5)
        ON CONFLICT ("userID", tmdb_id, list_type) DO NOTHING
        RETURNING *
    `
    const result = await query(sql, [userId, tmdb_id, list_type, movie_title, poster_path ?? null])
    return result.rows[0] ?? null // null means it was already in the list
}

export async function getListM(userId, listType) {
    const sql = `
        SELECT item_id, tmdb_id, list_type, movie_title, poster_path, created_at
        FROM list_items
        WHERE "userID" = $1 AND list_type = $2
        ORDER BY created_at DESC
    `
    const result = await query(sql, [userId, listType])
    return result.rows
}

export async function removeFromListM(userId, tmdbId, listType) {
    const sql = `
        DELETE FROM list_items
        WHERE "userID" = $1 AND tmdb_id = $2 AND list_type = $3
    `
    const result = await query(sql, [userId, tmdbId, listType])
    return result.rowCount
}