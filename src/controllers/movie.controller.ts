import {
    Controller,
    Post,
    Put,
    Body,
    Param,
    UploadedFile,
    UseInterceptors,
    Get,
    Query,
    Delete,
    NotFoundException,
    UseGuards,
  } from '@nestjs/common';
  import { FileInterceptor } from '@nestjs/platform-express';
  import { diskStorage } from 'multer';
  import { v4 as uuidv4 } from 'uuid';
  import { extname } from 'path';
  import { MovieService } from '../services/movie.service';
import { AuthGuard } from '../guards/auth.guard';
  
  @Controller('api/movies')
  @UseGuards(AuthGuard)
  export class MovieController {
    constructor(private readonly movieService: MovieService) {}

    @Post()
    @UseInterceptors(
      FileInterceptor('poster', {
        storage: diskStorage({
          destination: './uploads/images',
          filename: (req, file, callback) => {
            const uniqueName = `${uuidv4()}${extname(file.originalname)}`;
            callback(null, uniqueName);
          },
        }),
        limits: { fileSize: 50 * 1024 * 1024 },
      }),
    )
    async createMovie(@Body() movieData: any, @UploadedFile() file: Express.Multer.File) {
      const movie = await this.movieService.createMovie(movieData, file.filename);
      return { message: 'Movie created successfully', movie };
    }
  
    @Put(':id')
    @UseInterceptors(
      FileInterceptor('poster', {
        storage: diskStorage({
          destination: './uploads/images',
          filename: (req, file, callback) => {
            const uniqueName = `${uuidv4()}${extname(file.originalname)}`;
            callback(null, uniqueName);
          },
        }),
        limits: { fileSize: 50 * 1024 * 1024 },

      }),
    )
    async updateMovie(
      @Param('id') id: string,
      @Body() movieData: any,
      @UploadedFile() file?: Express.Multer.File,
    ) {
      const posterFilename = file ? file.filename : null;

      const updatedMovie = await this.movieService.updateMovie(id, movieData, file?.filename);
      return { message: 'Movie updated successfully', updatedMovie };
    }
  
    // Get the list of movies with pagination
    @Get()
    async getMovies(
      @Query('page') page: number = 1, // Default to page 1
      @Query('limit') limit: number = 10, // Default to limit of 10
    ) {
      const movies = await this.movieService.getMovies(page, limit);
      return movies;
    }

    // Delete movie by ID
  @Delete(':id')
  async deleteMovie(@Param('id') id: string) {
    await this.movieService.deleteMovie(id);
    return { message: 'Movie deleted successfully' };
  }

  @Get(':id')
  async getMovieById(@Param('id') id: string) {
    const movie = await this.movieService.getMovieById(id);
    if (!movie) {
      throw new NotFoundException('Movie not found');
    }
    return movie;
  }

  }
  