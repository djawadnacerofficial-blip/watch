import express, { json } from "express"
import { authRouter } from "./Routes/authR.js"
import { usersRouter } from "./Routes/usersR.js"
import { sessionConfig } from "./Config/sessionConfig.js"

const app = express()
const PORT = process.env.PORT

app.use(express.json())

app.use(sessionConfig)

app.use('/api/auth', authRouter)
app.use('/api/users', usersRouter)

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
})