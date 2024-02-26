import { 
    NextFunction, 
    Request, 
    Response 
} from "express"
import { AppError } from "../errors/error"
import "dotenv/config"
import { Movie } from "../entities"
import { movieRepo } from "../repositories"

const ensureNoNameDuplicatesMiddleWare = async (
    req: Request, 
    res: Response, 
    next: NextFunction
): Promise<Response | void> => {
    const foundMovie: Movie | null = await movieRepo.findOneBy({
        name: req.body.name
    })

    if (foundMovie) {
        const error = new AppError("Movie already exists.", 409)
        return next(error);
    }

    res.locals = { ...res.locals, foundMovie };

    return next(); 
}

const ensureIdExistsMiddleware = async(    
    req: Request, 
    res: Response, 
    next: NextFunction
): Promise<Response | void> => {
    const foundMovie: Movie | null = await movieRepo.findOneBy({
        id: Number(req.params.id)
    }) 
    
    if(!foundMovie) {
        const error = new AppError("Movie not found", 404)
        return next(error)
    }

    res.locals = {...res.locals, foundMovie}

    return next()
}

export { 
    ensureNoNameDuplicatesMiddleWare,
    ensureIdExistsMiddleware
}