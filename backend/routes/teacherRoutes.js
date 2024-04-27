const express = require("express");
const router = express.Router();
const { getTeachers, getTeacher, registerTeacher, loginTeacher, currentTeacher, getMentorProjects } = require("../controllers/teacherController");
const validateToken = require("../controllers/middleware/validateTokenHandler");

router.post("/register", registerTeacher).post("/login", loginTeacher);
router.get("/current", validateToken, currentTeacher);
router.get("/getMentorProjects", validateToken, getMentorProjects);
router.get("/", validateToken, getTeachers).get("/:id", validateToken, getTeacher);

module.exports = router;