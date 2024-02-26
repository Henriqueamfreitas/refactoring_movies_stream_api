import "dotenv/config"
import { 
    NextFunction, 
    Request, 
    Response 
} from "express"
import { ZodTypeAny } from "zod"
import { AppError } from "../errors/error"
import { verify } from "jsonwebtoken"
 
const validateBodyMiddleware = 
(schema: ZodTypeAny) =>  
(req: Request, res: Response, next: NextFunction): void => {
    const validated = schema.parse(req.body)
    req.body = validated
    
    return next()     
}

const token = (req: Request, res: Response, next: NextFunction): void => {
    const authorization: string|undefined = req.headers.authorization

    if(authorization === undefined){
        throw new AppError("Missing bearer token", 401)
    }

    const [ _bearer, token ] = authorization.split(" ") 

    verify(token, String(process.env.SECRET_KEY), (error: any, decoded: any) => {
        if(error){
            throw new AppError(error.message, 401)
        }

        res.locals = { ...res.locals, decoded };
    })
    
    return next()
}


export { 
    validateBodyMiddleware, 
    token 
}