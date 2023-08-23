import { z } from 'zod';
import { Movie } from "../entities"
import { movieCreateSchema } from '../schemas/movie.schema';
import { DeepPartial, Repository } from 'typeorm';

type MovieCreate = z.infer<typeof movieCreateSchema>;
type MovieRead = Array<Movie>;
type MovieUpdate = DeepPartial<Movie>;

type MovieRepo = Repository<Movie>

export { MovieCreate, MovieRead, MovieUpdate, MovieRepo }