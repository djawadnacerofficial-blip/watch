import pkg from "pg"
import dotenv from "dotenv"

const { Pool } = pkg
dotenv.config()


const pool = new Pool({
    connectionString: process.env.CONNECTION_STRING,
    ssl: {
        rejectUnauthorized: false
    }
})

export async function query(sql, params = []) {
    return pool.query(sql, params)
}