const UserService = require('../services/userService');

const userService = new UserService();

const signup = async (req, res) => {
  try {
    const result = await userService.createUser(req.body);

    return res.status(201).json({
      data: result,
      success: true,
      message: 'User signed up successfully',
      err: {}
    });

  } catch (error) {
    console.error('[SIGNUP ERROR]', error.message);

    return res.status(error.statusCode || 500).json({
      data: {},
      success: false,
      message: error.message || 'User signup failed',
      err: error.message
    });
  }
};

const login = async (req, res) => {
  try {
    const result = await userService.login(req.body);

    return res.status(200).json({
      data: result,
      success: true,
      message: 'User logged in successfully',
      err: {}
    });

  } catch (error) {
    console.error('[LOGIN ERROR]', error.message);

    return res.status(error.statusCode || 500).json({
      data: {},
      success: false,
      message: error.message || 'User login failed',
      err: error.message
    });
  }
};

const getAllProjects = async (req, res) => {
  try {
    const userId = req.user.userId;

    const projects = await userService.getAllProjects(userId);

    return res.status(200).json({
      data: projects,
      success: true,
      message: 'Projects fetched successfully',
      err: {}
    });

  } catch (error) {
    console.error('[GET PROJECTS ERROR]', error.message);

    return res.status(error.statusCode || 500).json({
      data: {},
      success: false,
      message: error.message || 'Fetching projects failed',
      err: error.message
    });
  }
};

module.exports = {
  signup,
  login,
  getAllProjects
};