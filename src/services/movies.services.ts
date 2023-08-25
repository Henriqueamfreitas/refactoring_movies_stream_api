import { Repository } from "typeorm"
import { Movie } from "../entities";
import { AppDataSource } from "../data-source";
import { MovieCreate, MovieRead, MovieUpdate } from "../interfaces/movies.interfaces";
import { movieCreateSchema } from "../schemas/movie.schema";
import { movieRepo } from "../repositories";
import { string } from "pg-format";
import { AppError } from "../errors/error";

const createMovieService = async (movieData: Movie): Promise<any> => {
  const movie: Movie = movieRepo.create(movieData);

  await movieRepo.save(movie);

  return movie;
};

const listMoviesPerPageService = async (payload:any): Promise<Movie[]> => {
  let sort: string = payload.sort 
  let order: string = payload.order 
  let page: number = Number(payload.page) 
  let perPage: number = Number(payload.perPage) 
  
  const sortVerification = (sort === "price") || (sort === "duration")
  if(!sortVerification){
    sort = "id"
    order = "asc"
  }

  const orderVerification = (order === "asc") || (order === "desc")
  if(!orderVerification){
    order = "asc"
  }

  const perPageVerification = (Number.isInteger(perPage) && perPage>0 && perPage<=5) 
  if(!perPageVerification){
    perPage=5
  }

  const pageVerification = (Number.isInteger(page) && page>0) 
  if(!pageVerification){
    page=1
  }

  const movies = movieRepo.find({
    take: perPage, 
    skip: perPage * (page - 1),
    order: {
      [sort]: `${order}`
    }
  })
  
  return movies;
};

const deleteMovieService = async (movie: Movie): Promise<void> => {
  await movieRepo.remove(movie);
};

const updateMovieService = async ( movie: Movie, payload: MovieUpdate): Promise<Movie> => {
  return await movieRepo.save({ ...movie, ...payload });
};

export { createMovieService, listMoviesPerPageService, deleteMovieService, updateMovieService }
