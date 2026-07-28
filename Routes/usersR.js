import { Router } from "express"
import { getMyProfile, getUserProfile, updateMyProfile, uploadProfileImg, deleteProfileImg } from '../Controllers/usersC.js'
import { authMW } from "../Middleware/authMW.js"
import { addTags, deleteTags } from "../Controllers/tagsC.js"
import { upload } from "../Middleware/multer.js"


export const usersRouter = Router()

usersRouter.get('/me', authMW, getMyProfile)
usersRouter.get('/:username', getUserProfile)
usersRouter.patch('/me', authMW, updateMyProfile)
usersRouter.patch('/me/tags', authMW, addTags)
usersRouter.delete('/me/tags', authMW, deleteTags)
usersRouter.patch('/me/profile-photo', authMW, upload.single("profilePhoto"), uploadProfileImg)
usersRouter.delete('/me/profile-photo', authMW, deleteProfileImg)