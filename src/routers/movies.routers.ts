import { Router } from "express";
import "dotenv/config";
import { validateBodyMiddleware } from "../middlewares/validadeBody.middleware";
import { createMovieController } from "../controllers/movies.controllers";
import { movieCreateSchema } from "../schemas/movie.schema";
import { ensureNoNameDuplicatesMiddleWare } from "../middlewares/verify.middleware";

const moviesRouter: Router = Router()

moviesRouter.post(
    '/', 
    validateBodyMiddleware(movieCreateSchema),
    ensureNoNameDuplicatesMiddleWare,
    createMovieController
)

export { moviesRouter }