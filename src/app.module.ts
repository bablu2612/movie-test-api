import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { UserController } from './controllers/user.controller';
import { MovieController } from './controllers/movie.controller';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { MovieService } from './services/movie.service';
import { User, UserSchema } from './schemas/user.schema';
import { Movie, MovieSchema } from './schemas/movie.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/moviesdb'), // MongoDB URI
    MongooseModule.forFeature([
      { name: Movie.name, schema: MovieSchema },
      { name: User.name, schema: UserSchema },
    ]),
    JwtModule.register({
      secret: 'secretKey', // Replace with a more secure key in production
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [UserController, MovieController],
  providers: [AuthService, UserService, MovieService],
})
export class AppModule {}
