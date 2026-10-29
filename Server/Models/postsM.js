import { query } from "../db/Database.js";

export async function getAllPostsM() {
    try {
        const sql = `
            SELECT
                p.post_id,
                p.post_txt,
                p.movie_name,
                p."userID",
                p.created_at,
                p.updated_at,
                u.username,
                u."profilePhoto"
            FROM posts p
            JOIN users u ON p."userID" = u."userID"
            ORDER BY p.created_at DESC
        `;

        return await query(sql);

    } catch (err) {
        console.log(err);
        throw err;
    }
}

export async function createPostM(userId, post) {
    try {
        const allowedFields = ["post_txt", "movie_name"];

        const keys = Object.keys(post).filter(key =>
            allowedFields.includes(key)
        );

        const hasInvalidField = Object.keys(post).some(
            key => !allowedFields.includes(key)
        );

        if (hasInvalidField) {
            throw new Error("Invalid field");
        }

        if (keys.length === 0) {
            return null;
        }

        const columnsList = [...keys, '"userID"'];
        const columns = columnsList.join(", ");

        const placeholders = columnsList
            .map((_, index) => `$${index + 1}`)
            .join(", ");

        const values = [...keys.map(key => post[key]), userId];

        const sql = `
            INSERT INTO posts(${columns})
            VALUES(${placeholders})
            RETURNING *
        `;

        return await query(sql, values);

    } catch (err) {
        console.log(err);
        throw err;
    }
}

export async function updatePostM(userId, post_id, post) {
    try {
        const allowedFields = ["post_txt", "movie_name"];

        const keys = Object.keys(post).filter(key =>
            allowedFields.includes(key)
        );

        const hasInvalidField = Object.keys(post).some(
            key => !allowedFields.includes(key)
        );

        if (hasInvalidField) {
            throw new Error("Invalid field");
        }

        if (keys.length === 0) {
            return null;
        }

        const setClause = keys
            .map((key, index) => `${key} = $${index + 1}`)
            .join(", ");

        const values = [
            ...keys.map(key => post[key]),
            userId,
            post_id
        ];

        const sql = `
            UPDATE posts
            SET
                ${setClause},
                updated_at = NOW()
            WHERE "userID" = $${values.length - 1}
              AND post_id = $${values.length}
            RETURNING *
        `;

        return await query(sql, values);

    } catch (err) {
        console.log(err);
        throw err;
    }
}

export async function deletePostM(userId, post_id) {
    try {
        const sql = `
            DELETE FROM posts
            WHERE "userID" = $1
              AND post_id = $2
            RETURNING *
        `;

        return await query(sql, [userId, post_id]);

    } catch (err) {
        console.log(err);
        throw err;
    }
}

export async function getPostBymovieM(tag) {
    try {
        const sql = `
            SELECT p.*, u.username, u."profilePhoto"
            FROM posts p
            JOIN users u ON u."userID" = p."userID"
            WHERE p.movie_name ILIKE $1
            ORDER BY p.created_at DESC
        `;
        const result = await query(sql, [`%${tag}%`]);
        return result.rows;
    } catch (err) {
        console.log(err);
        throw err;
    }
}