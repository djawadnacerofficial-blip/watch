import dotenv from "dotenv"
import cors from "cors"
dotenv.config()

import express from "express"
import { authRouter } from "./Routes/authR.js"
import { usersRouter } from "./Routes/usersR.js"
import { postsRouter } from './Routes/postsR.js'
import { commentsRouter } from './Routes/commentsR.js'
import { sessionConfig } from "./Config/sessionConfig.js"

const app = express()
const PORT = process.env.PORT

app.use(express.json())

app.use(sessionConfig)

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);

app.use('/api/auth', authRouter)
app.use('/api/users', usersRouter)
app.use('/api/posts', postsRouter)
app.use('/api/comments', commentsRouter)
app.use('/api/media')
app.use('/api/settings')
app.use('/api/search')
/* setting and movies */


app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
})