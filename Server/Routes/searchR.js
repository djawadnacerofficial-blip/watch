import { Router } from "express";
import { authMW } from "../Middleware/authMW.js";
import { search } from "../Controllers/searchC.js";

export const searchRouter = Router()

searchRouter.get('/', authMW, search)
