const express = require("express");
const router = express.Router();
const validateToken = require("../controllers/middleware/validateTokenHandler");
const { getProjects, getProject, createProject } = require("../controllers/projectController");

router.get("/", getProjects).get("/:id", getProject);
router.post("/create", validateToken, createProject);

module.exports = router;