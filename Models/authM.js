import { query } from "../Database.js"

export async function checkUser(username, email) {
    try{

        const sql = "SELECT * FROM users WHERE username = $1 OR email = $2"
        const user = await query(sql, [username, email])
        return  user

    } catch (err) {
        throw err
    }
}

export async function findUser(identifier) {
    try {

        const sql = `SELECT * FROM users WHERE username = $1 OR email = $1`
        const user = await query(sql, [identifier])
        return user

    } catch (err) {
        throw err
    }
}
export async function pushUser(username, email, password) {
    try{

        const sql = `INSERT INTO users(username, email, "passwordHash")
        VALUES($1, $2, $3)
        RETURNING "userID"`
        const lastUser = await query(sql, [username, email, password])
        return lastUser

    } catch (err) {
        throw err
    }
}