const express = require("express");
const router = express.Router();
const projectRoutes = require("./projects");
const fileRoutes = require("./files");
const userRoutes = require("./users");

router.use("/projects", projectRoutes);
router.use("/files", fileRoutes);
router.use("/users", userRoutes);

module.exports = router;