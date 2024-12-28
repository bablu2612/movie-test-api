interface User {
    email: string;
    password: string;
    // Add other fields here as needed
  }
  
  import * as jwt from 'jsonwebtoken';
  import * as bcrypt from 'bcrypt';
  import { Injectable } from '@nestjs/common';

  @Injectable()
  export class AuthService {
    private users: User[] = []; // Type the users array with the User interface
  
    async register(userData: User) {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      this.users.push({ ...userData, password: hashedPassword });
      return { message: 'User registered successfully' };
    }
  
    async login(credentials: { email: string; password: string }) {
      const user = this.users.find(u => u.email === credentials.email);
      if (!user || !(await bcrypt.compare(credentials.password, user.password))) {
        throw new Error('Invalid credentials');
      }
      const token = jwt.sign({ email: user.email }, 'secret', { expiresIn: '1h' });
      return { token };
    }
  }
  