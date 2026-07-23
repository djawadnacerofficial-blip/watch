import bcrypt from "bcrypt"
import validator from "validator"
import { checkUser, findUser, pushUser } from "../Models/authM.js"



export async function register(req, res) {
    try {
        
        let { username, email, password } = req.body

        if (!username || !email || !password) {
            return res.status(400).json({error: "all fields must be filled"})
        }

        username = username.trim().toLowerCase()
        email = email.trim().toLowerCase()

        if (!/^[a-zA-Z0-9_-]{1,20}$/.test(username)) {
            return res.status(400).json({error: "Username must be 1 to 20 characters, using letters, numbers, _ or -."})
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({error: "email is not valid"})
        }

        const userExisting = await checkUser(username, email)

        if (userExisting.rows[0]) {
            return res.status(409).json({error: "user already exists"})
        }

        const hashed = await bcrypt.hash(password, 10)

        const lastUser = await pushUser(username, email, hashed)
        const userID = lastUser.rows[0].userID

        req.session.userId = userID

        return  res.status(201).json({msg: "user has been created"})

    } catch (err) {
            console.log(err)
            return res.status(500).json({ error: "Internal server error" })
        }

}

export async function login(req, res) {
    try {

        let { identifier, password } = req.body

        if (!identifier || !password) {
            return res.status(400).json({error: "all fields must be filled"})
        }

        identifier = identifier.trim()

        const exists = await findUser(identifier)

        if (!exists.rows[0]) {
            return res.status(401).json({error: "invalid credentials"})
        }

        const user = exists.rows[0] 

        const passwordMatch = await bcrypt.compare(password, user.passwordHash)

        if (!passwordMatch) {
            return res.status(401).json({error: "invalid credentials"})
        }

        req.session.userId = user.userID

        console.log(`User ${user.userID} logged in`)

        return res.status(200).json({message: "logged in successfully"})


    } catch (err) {
        console.log(err)
        return res.status(500).json({error: "Internal server error"})
    }
}

export async function logout(req, res) {

        req.session.destroy((err) => {
            if (err) {
                console.log(err)
                return res.status(500).json({error: "Internal server error"})
            }

            res.clearCookie("connect.sid")

            return res.status(200).json({message: "Logged out successfully"})
        })

        
}