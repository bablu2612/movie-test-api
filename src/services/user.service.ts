import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from '../schemas/user.schema';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService, // For generating JWT tokens
  ) {}

  // Register a new user
  async register(userData: { email: string; password: string; username: string }) {
    const { email, password, username } = userData;
    const existingUser = await this.userModel.findOne({ email }).exec();
    
    if (existingUser) {
      throw new Error('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new this.userModel({
      email,
      username,
      password: hashedPassword,
    });
    
    return newUser.save();
  }

  // Login the user
  async login(credentials: { email: string; password: string }) {
    const { email, password } = credentials;
    const user = await this.userModel.findOne({ email }).exec();
    
    if (!user) {
      throw new Error('Invalid email or password');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new Error('Invalid email or password');
    }

    const payload = { email: user.email, username: user.username };
    const token = this.jwtService.sign(payload);

    return { token };
  }

  // Find a user by email
  async findUserByEmail(email: string) {
    return this.userModel.findOne({ email }).exec();
  }
}
