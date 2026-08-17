
import { authMW } from "../Middleware/authMW.js"
import { Router } from 'express'
import { updateCommentC, deleteCommentC } from '../Controllers/commentsC.js'

export const commentsRouter = Router()


commentsRouter.patch('/:comment_id', authMW, updateCommentC)
commentsRouter.delete('/:comment_id', authMW, deleteCommentC)
