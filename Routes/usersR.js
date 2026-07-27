import { Router } from "express"
import { getMyProfile, getUserProfile, updateMyProfile } from '../Controllers/usersC.js'
import { authMW } from "../Middleware/authMW.js"
import { addTags, deleteTags } from "../Controllers/tagsC.js"


export const usersRouter = Router()

usersRouter.get('/me', authMW, getMyProfile)
usersRouter.get('/:username', getUserProfile)
usersRouter.patch('/me', authMW, updateMyProfile)
usersRouter.patch('/me/tags', authMW, addTags)
usersRouter.delete('/me/tags', authMW, deleteTags)