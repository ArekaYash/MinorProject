const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Teacher = require("../models/teacherModel");
const Project = require("../models/projectModel");

const getTeachers = asyncHandler(async (req, res) => {
    const teachers = await Teacher.find();
    res.status(200).json({ teachers });
});

const getTeacher = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const teacher = Teacher.findById(id);
    if (!teacher) {
        res.status(400);
        throw new Error("Teacher not found");
    }
    res.json(200).json({ teacher });
});

const registerTeacher = asyncHandler(async (req, res) => {
    const { email, name, sap_id, password } = req.body;
    if (!email || !name || !sap_id || !password) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    const teacherExist = await Teacher.findOne({ email });
    if (teacherExist) {
        res.status(400);
        throw new Error("Teacher already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const teacher = await Teacher.create({
        name,
        sap_id,
        email,
        password: hashedPassword
    });

    if (teacher) {
        res.status(201).json({ teacher });
    } else {
        res.status(400);
        throw new Error("Failed to register teacher");
    }
});

const loginTeacher = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    const teacher = await Teacher.findOne({ email });
    if (teacher && (await bcrypt.compare(password, teacher.password))) {
        const accessToken = jwt.sign({
            user: {
                name: teacher.name,
                sap_id: teacher.sap_id,
                email: teacher.email,
                id: teacher.id
            }
        }, process.env.ACCESS_SECRET_TOKEN, { expiresIn: "100m" });
        res.status(200).json({ accessToken });
    } else {
        res.status(401);
        throw new Error("teacher doesn't exists or incorrect password");
    }
});

const getMentorProjects = asyncHandler(async (req, res) => {
    const teacherId = req.user.id;
    const teacher = await Teacher.findById(teacherId);
    if (!teacher) {
        res.status(400);
        throw new Error("Teacher does not exist");
    }
    const projects = await Project.find({ mentors: { $in: [teacherId] } })
        .populate('members mentors coordinators evaluators')
        .exec();
    res.status(200);
    res.json({ projects });
});

const currentTeacher = asyncHandler(async (req, res) => {
    const email = req.user.email;
    const teacher = await Teacher.findOne({ email });
    res.status(200).json({ name: teacher.name, email: teacher.email, sap_id: teacher.sap_id });
});

module.exports = { getTeachers, getTeacher, registerTeacher, loginTeacher, currentTeacher, getMentorProjects };