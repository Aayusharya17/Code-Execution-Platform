const express = require("express");
const router = express.Router();
const projectRoutes = require("./projectRoutes");
const fileRoutes = require("./fileRoutes");
const userRoutes = require("./userRoutes");

router.use("/projects", projectRoutes);
router.use("/files", fileRoutes);
router.use("/user", userRoutes);

module.exports = router;