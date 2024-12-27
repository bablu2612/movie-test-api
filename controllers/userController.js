const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class UserController {
  constructor() {
    // Explicitly bind methods
    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
    this.generateJwtToken = this.generateJwtToken.bind(this);
  }

  // Register a new user
  async register(req, res) {
    const { email, password } = req.body;

    try {
      if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
      }

      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ message: 'Email already registered' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        email,
        password: hashedPassword,
      });

      await newUser.save();

      // Generate JWT token
      const token = this.generateJwtToken(newUser); // Calling the method here

      return res.status(201).json({ token });
    } catch (err) {
      console.error("Error during registration:", err);
      return res.status(500).json({ message: 'Server error during registration' });
    }
  }

  // Login an existing user
  async login(req, res) {
    const { email, password } = req.body;

    try {
      if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
      }

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }

      const token = this.generateJwtToken(user);

      return res.status(200).json({ token });
    } catch (err) {
      console.error("Error during login:", err);
      return res.status(500).json({ message: 'Server error during login' });
    }
  }

  // Function to generate JWT token
  generateJwtToken(user) {
    const payload = { userId: user._id, email: user.email };
    const secretKey = process.env.JWT_SECRET_KEY || 'bablu-kumar-2612';
    return jwt.sign(payload, secretKey, { expiresIn: '1h' });
  }
}

// Create instance of controller
const userController = new UserController();

// Export the controller instance
module.exports = userController;
