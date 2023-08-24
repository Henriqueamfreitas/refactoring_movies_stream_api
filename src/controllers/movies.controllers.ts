import { Request, Response } from "express";
import { createMovieService, listMoviesService, listMoviesPerPageService } from "../services/movies.services";
import { Movie } from "../entities";
import { movieRepo } from "../repositories";

const createMovieController = async (req: Request, res: Response): Promise<Response> => {
    const movieData: Movie = req.body 
    const newMovie = await createMovieService(movieData);
    return res.status(201).json(newMovie);
};

const listMoviesController = async (req: Request, res: Response): Promise<Response> => {
  const movies: Movie[] = await listMoviesService();
  
  return res.status(200).json(movies);
};

// const listMoviesPerPageController = async (req: Request, res: Response): Promise<Response> => {
//   const count: number = (await movieRepo.find()).length
//   const movies: Movie[] = await listMoviesPerPageService(req.query);

//   const baseUrl = `http://localhost:3000/movies?`
//   const page = Number(req.query.page)
//   const perPage = Number(req.query.perPage)
//   const prevPage = page > 1 ? `${baseUrl}page=${Number(page - 1)}&perPage=${Number(perPage)}` : null
//   const nextPage = `${baseUrl}page=${Number(page + 1)}&perPage=${Number(perPage)}`

//   const returnObject = {
//     prevPage: prevPage,
//     nextPage: nextPage,
//     count: count,
//     data: movies
//   }
//   return res.status(200).json(returnObject);
// };

const listMoviesPerPageController = async (req: Request, res: Response): Promise<Response> => {
  const baseUrl = `http://localhost:3000/movies?`
  let page = Number(req.query.page) || 1;
  let perPage = Number(req.query.perPage) || 5;

  if(!(Number.isInteger(perPage) && perPage>0 && perPage<=5)){
    perPage = 5 
  } 

  if(page === -1){
    page=1
  }


  const count: number = (await movieRepo.find()).length
  const movies: Movie[] = await listMoviesPerPageService(req.query);
  const prevPage = page > 1 ? `${baseUrl}page=${Number(page - 1)}&perPage=${Number(perPage)}` : null
  let nextPage: string | null = ""
  if((page*perPage-perPage-count > 0)){
    nextPage = null
  } else{
    nextPage = `${baseUrl}page=${Number(page + 1)}&perPage=${Number(perPage)}`
  }


  const returnObject = {
    prevPage: prevPage,
    nextPage: nextPage,
    count: count,
    data: movies
  }
  return res.status(200).json(returnObject);
};

export { createMovieController, listMoviesController, listMoviesPerPageController }
