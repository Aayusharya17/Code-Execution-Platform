const User = require('../models/User');
const Project = require('../models/Project');

class UserRepository {

  async findUserByEmail(email) {
    return await User.findOne({ email });
  }

  async createUser(user) {
    return await User.create(user);
  }

  async getAllProjects(userId) {
    return await Project.find({ user: userId }).sort({ createdAt: -1 });
  }
}

module.exports = UserRepository;