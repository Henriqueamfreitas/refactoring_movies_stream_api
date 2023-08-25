import { Router } from "express";
import "dotenv/config";
import { validateBodyMiddleware } from "../middlewares/validadeBody.middleware";
import { 
    createMovieController, 
    listMoviesPerPageController,
    deleteMovieController,
    updateMovieController 
} from "../controllers/movies.controllers";
import { movieCreateSchema, updateMovieSchema, movieSchema, movieReturnManySchema } from "../schemas/movie.schema";
import { ensureIdExistsMiddleware, ensureNoNameDuplicatesMiddleWare } from "../middlewares/verify.middleware";

const moviesRouter: Router = Router()

moviesRouter.post(
    '/', 
    validateBodyMiddleware(movieCreateSchema),
    ensureNoNameDuplicatesMiddleWare,
    createMovieController
)

moviesRouter.get(
    '/', 
    listMoviesPerPageController
)

moviesRouter.delete(
    '/:id',
    ensureIdExistsMiddleware,
    deleteMovieController
)

moviesRouter.patch(
    '/:id',
    validateBodyMiddleware(updateMovieSchema),
    ensureIdExistsMiddleware,
    updateMovieController
)

export { moviesRouter }