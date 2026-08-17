import { Router } from "express";
import { authMW } from "../Middleware/authMW";
import { search } from "../Controllers/seaerchC";

const searchRouter = Router()

searchRouter.get('/:q', authMW, search)
