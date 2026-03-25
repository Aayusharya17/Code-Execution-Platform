const Router = require('express').Router();
const userController = require('../../controller/userController');
const authMiddleware = require('../../middleware/auth'); 

Router.post('/signup', userController.signup); //works
Router.post('/login', userController.login);   //works
Router.get('/projects', authMiddleware, userController.getAllProjects); //works

module.exports = Router;