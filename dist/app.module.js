"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const jwt_1 = require("@nestjs/jwt");
const user_controller_1 = require("./controllers/user.controller");
const movie_controller_1 = require("./controllers/movie.controller");
const auth_service_1 = require("./services/auth.service");
const user_service_1 = require("./services/user.service");
const movie_service_1 = require("./services/movie.service");
const user_schema_1 = require("./schemas/user.schema");
const movie_schema_1 = require("./schemas/movie.schema");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forRoot('mongodb://localhost:27017/moviesdb'), // MongoDB URI
            mongoose_1.MongooseModule.forFeature([
                { name: movie_schema_1.Movie.name, schema: movie_schema_1.MovieSchema },
                { name: user_schema_1.User.name, schema: user_schema_1.UserSchema },
            ]),
            jwt_1.JwtModule.register({
                secret: 'secretKey', // Replace with a more secure key in production
                signOptions: { expiresIn: '1h' },
            }),
        ],
        controllers: [user_controller_1.UserController, movie_controller_1.MovieController],
        providers: [auth_service_1.AuthService, user_service_1.UserService, movie_service_1.MovieService],
    })
], AppModule);
