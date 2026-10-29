import express from "express"
import { authMW } from "../Middleware/authMW.js"
import { addToListC, getListC, removeFromListC } from "../Controllers/listsC.js"

export const listsRouter = express.Router()

listsRouter.get("/", authMW, getListC)
listsRouter.post("/", authMW, addToListC)
listsRouter.delete("/:tmdbId", authMW, removeFromListC)