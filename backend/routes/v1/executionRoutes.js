const Router = require("express").Router();
const executionController = require("../../controller/executionController");
const authMiddleware = require("../../middleware/auth");

Router.post("/:fileId", authMiddleware, executionController.runCode);

module.exports = Router;