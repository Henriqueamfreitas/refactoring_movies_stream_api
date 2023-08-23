import { Request, Response } from "express";
import { createMovieService } from "../services/movies.services";
import { Movie } from "../entities";

const createMovieController = async (req: Request, res: Response): Promise<Response> => {
    const movieData: Movie = req.body 
    const newMovie = await createMovieService(movieData);
    return res.status(201).json(newMovie);
};

export { createMovieController }
