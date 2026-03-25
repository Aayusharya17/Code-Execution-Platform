const express = require("express");
const router = express.Router();
const projectRoutes = require("./projectRoutes");
const fileRoutes = require("./fileRoutes");
const userRoutes = require("./userRoutes");
const executionRoutes = require("./executionRoutes");

router.use("/projects", projectRoutes);
router.use("/files", fileRoutes);
router.use("/user", userRoutes);
router.use("/execute",executionRoutes);

module.exports = router;