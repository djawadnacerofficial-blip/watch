import { Router } from "express"
import { getMyProfile, getUserProfile, updateMyProfile } from '../Controllers/usersC.js'
import { authMW } from "../Middleware/authMW.js"


export const usersRouter = Router()

usersRouter.get('/me', authMW, getMyProfile)
usersRouter.get('/:username', getUserProfile)
usersRouter.patch('/me', authMW, updateMyProfile)