import { Request, Response } from "express";
import { createMovieService, listMoviesService } from "../services/movies.services";
import { Movie } from "../entities";

const createMovieController = async (req: Request, res: Response): Promise<Response> => {
    const movieData: Movie = req.body 
    const newMovie = await createMovieService(movieData);
    return res.status(201).json(newMovie);
};

const listMoviesController = async (req: Request, res: Response): Promise<Response> => {
  const movies: Movie[] = await listMoviesService();
  
  return res.status(200).json(movies);
};


export { createMovieController, listMoviesController }
