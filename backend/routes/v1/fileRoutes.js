const Router = require('express').Router();
const fileController = require('../../controller/fileController');
const authMiddleware = require('../../middleware/auth');

Router.post('/:projectId', authMiddleware, fileController.createFile); // works
Router.get('/:fileId', authMiddleware, fileController.getFile); // works
Router.put('/:fileId', authMiddleware, fileController.updateFile);//works
Router.delete('/:fileId', authMiddleware, fileController.deleteFile);//works

module.exports = Router;