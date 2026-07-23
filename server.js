import express, { json } from "express"
import { authRouter } from "./Routes/authR.js"
import session from "express-session"

const app = express()
const PORT = process.env.PORT

app.use(express.json())

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

app.use('/api/auth', authRouter)

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
})