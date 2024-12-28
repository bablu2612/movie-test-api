"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const movie_schema_1 = require("../schemas/movie.schema");
let MovieService = class MovieService {
    constructor(movieModel) {
        this.movieModel = movieModel;
    }
    // Create a new movie
    async createMovie(movieData, poster) {
        const movie = new this.movieModel(Object.assign(Object.assign({}, movieData), { poster }));
        return await movie.save();
    }
    // Update an existing movie
    async updateMovie(id, movieData, poster) {
        const movie = await this.movieModel.findById(id);
        if (!movie) {
            throw new Error('Movie not found');
        }
        movie.set(Object.assign(Object.assign({}, movieData), (poster && { poster })));
        return await movie.save();
    }
    // Get a list of movies with pagination
    async getMovies(page = 1, limit = 10) {
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
};
exports.MovieService = MovieService;
exports.MovieService = MovieService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(movie_schema_1.Movie.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], MovieService);
