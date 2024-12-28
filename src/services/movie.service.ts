import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Movie, MovieDocument } from '../schemas/movie.schema';

@Injectable()
export class MovieService {
  constructor(
    @InjectModel(Movie.name) private readonly movieModel: Model<MovieDocument>,
  ) {}

  // Create a new movie
  async createMovie(movieData: any, poster: string) {
    const movie = new this.movieModel({
      ...movieData,
      poster,
    });
    return await movie.save();
  }

  // Update an existing movie
  async updateMovie(id: string, movieData: any, poster?: string) {
    const movie = await this.movieModel.findById(id);
    if (!movie) {
      throw new Error('Movie not found');
    }

    movie.set({
      ...movieData,
      ...(poster && { poster }),
    });

    return await movie.save();
  }

  // Get a list of movies with pagination
  async getMovies(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit; // Calculate how many records to skip

    const movies = await this.movieModel
      .find()
      .skip(skip) // Skip records
      .limit(limit) // Limit records
      .exec();

    const totalMovies = await this.movieModel.countDocuments(); // Get the total count for pagination metadata

    return {
      totalMovies,
      currentPage: page,
      totalPages: Math.ceil(totalMovies / limit),
      movies,
    };
  }

  // Delete a movie by its ID
  async deleteMovie(id: string): Promise<void> {
    const movie = await this.movieModel.findById(id);
  if (!movie) {
    throw new Error('Movie not found');
  }

  // Use findByIdAndDelete to remove the movie
  await this.movieModel.findByIdAndDelete(id);
}

async getMovieById(id: string) {
  return await this.movieModel.findById(id).exec();
}
  
}
