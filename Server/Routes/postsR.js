import { Router } from 'express'
import { authMW } from "../Middleware/authMW.js"
import { getPosts, createPost, updatePost, deletePost } from '../Controllers/postsC.js'
import { getCommentsC, createCommentC } from '../Controllers/commentsC.js'


export const postsRouter = Router()

postsRouter.get('/', authMW, getPosts)
postsRouter.post('/', authMW, createPost)
postsRouter.patch('/:post_id', authMW, updatePost)
postsRouter.delete('/:post_id', authMW, deletePost)
postsRouter.get('/:post_id/comments', authMW, getCommentsC)
postsRouter.post('/:post_id/comments', authMW, createCommentC)