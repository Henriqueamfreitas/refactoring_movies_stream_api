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
    if(!req.body.name){
        return next()
    }
    
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


const ensureUniqueNameMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    const { body } = req;

    const existingMovie = await movieRepo.findOneBy({ name: body.name });

    if ((existingMovie) && (existingMovie.id !== Number(req.params.id))) {
        const error = new AppError("Movie already exists.", 409);
        return next(error);
    }

    return next();
};



export { 
    ensureNoNameDuplicatesMiddleWare,
    ensureIdExistsMiddleware,
    ensureUniqueNameMiddleware
}