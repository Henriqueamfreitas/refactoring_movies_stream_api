import { AppDataSource } from "./data-source";
import { Movie } from "./entities"
import { MovieRepo } from "./interfaces/movies.interfaces";

const movieRepo: MovieRepo = AppDataSource.getRepository(Movie);

export { movieRepo };