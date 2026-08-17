import { query } from "../db/Database.js";

export async function getCommentsM(postId) {
    try {
        const sql = `
            SELECT *
            FROM comments
            WHERE post_id = $1
            ORDER BY created_at ASC
        `;

        return await query(sql, [postId]);

    } catch (err) {
        console.log(err);
        throw err;
    }
}

export async function createCommentM(comment, userId) {
    try {
        const allowedFields = [
            "post_id",
            "parent_comment_id",
            "comment_txt"
        ];

        const keys = Object.keys(comment).filter(key =>
            allowedFields.includes(key)
        );

        const hasInvalidField = Object.keys(comment).some(
            key => !allowedFields.includes(key)
        );

        if (hasInvalidField) {
            throw new Error("Invalid field");
        }

        if (keys.length === 0) {
            return null;
        }

        if (!comment.comment_txt?.trim()) {
            throw new Error("comment_txt is required");
        }

        const columnsList = [...keys, '"userID"'];
        const columns = columnsList.join(", ");

        const placeholders = columnsList
            .map((_, index) => `$${index + 1}`)
            .join(", ");

        const values = [
            ...keys.map(key => comment[key]),
            userId
        ];

        const sql = `
            INSERT INTO comments(${columns})
            VALUES(${placeholders})
            RETURNING *
        `;

        return await query(sql, values);

    } catch (err) {
        console.log(err);
        throw err;
    }
}

export async function updateCommentM(commentId, comment, userId) {
    try {
        const allowedFields = ["comment_txt"];

        const keys = Object.keys(comment).filter(key =>
            allowedFields.includes(key)
        );

        const hasInvalidField = Object.keys(comment).some(
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
            ...keys.map(key => comment[key]),
            userId,
            commentId
        ];

        const sql = `
            UPDATE comments
            SET
                ${setClause},
                updated_at = NOW()
            WHERE "userID" = $${values.length - 1}
              AND comment_id = $${values.length}
            RETURNING *
        `;

        return await query(sql, values);

    } catch (err) {
        console.log(err);
        throw err;
    }
}

export async function deleteCommentM(commentId, userId) {
    try {
        const sql = `
            DELETE FROM comments
            WHERE comment_id = $1
              AND "userID" = $2
            RETURNING *
        `;

        return await query(sql, [commentId, userId]);

    } catch (err) {
        console.log(err);
        throw err;
    }
}