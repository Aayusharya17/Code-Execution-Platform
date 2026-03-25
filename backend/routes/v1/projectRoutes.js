const Router = require('express').Router();
const projectController = require('../../controller/projectController');
const authMiddleware = require('../../middleware/auth');

Router.post('/create', authMiddleware, projectController.createProject);   //works
Router.get('/:projectId/files', authMiddleware, projectController.getAllFiles); //works

module.exports = Router;