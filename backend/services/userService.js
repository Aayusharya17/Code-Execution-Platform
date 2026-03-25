const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserRepository = require('../repositories/userRepository');
const { JWT_SECRET } = require('../config/serverConfig');

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async createUser(userData) {
    const { username, email, password } = userData;

    if (!username || !email || !password) {
      const err = new Error('All fields are required');
      err.statusCode = 400;
      throw err;
    }

    const existingUser = await this.userRepository.findUserByEmail(email);
    if (existingUser) {
      const err = new Error('Email already in use');
      err.statusCode = 409;
      throw err;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await this.userRepository.createUser({
      username,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { userId: newUser._id },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    return {
      token,
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email
      }
    };
  }

  async login(data) {
    const { email, password } = data;

    if (!email || !password) {
      const err = new Error('Email and password required');
      err.statusCode = 400;
      throw err;
    }

    const user = await this.userRepository.findUserByEmail(email);
    if (!user) {
      const err = new Error('User not found');
      err.statusCode = 404;
      throw err;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      const err = new Error('Invalid password');
      err.statusCode = 401;
      throw err;
    }

    const token = jwt.sign(
      { userId: user._id },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    return {
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    };
  }

  async getAllProjects(userId) {
    if (!userId) {
      const err = new Error('User ID is required');
      err.statusCode = 400;
      throw err;
    }

    const projects = await this.userRepository.getAllProjects(userId);
    return projects;
  }
}

module.exports = UserService;