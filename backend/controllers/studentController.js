const asyncHandler = require("express-async-handler");
const Student = require("../models/studentModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getStudents = asyncHandler(async (req, res) => {
    const students = await Student.find();
    res.status(200).json({ students });
});

const getStudent = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const student = await Student.findById(id);
    if (!student) {
        res.status(404);
        throw new Error("Student not found");
    }
    res.json({ student });
});

const registerStudent = asyncHandler(async (req, res) => {
    const { name, email, sap_id, password } = req.body;
    if (!name || !email || !sap_id || !password) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    studentExist = await Student.findOne({ email });
    if (studentExist) {
        res.status(400);
        throw new Error("email already used");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const student = await Student.create({
        name,
        email,
        sap_id,
        password: hashedPassword,
    });

    if (student) {
        res.status(201).json({ name, email, sap_id });
    } else {
        res.status(400);
        throw new Error("Failed to register student");
    }
});

const loginStudent = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    const student = await Student.findOne({ email });
    if (student && (await bcrypt.compare(password, student.password))) {
        const accessToken = jwt.sign(
            {
                user: {
                    sap_id: student.sap_id,
                    email: student.email,
                    id: student.id
                }
            },
            process.env.ACCESS_SECRET_TOKEN,
            {
                expiresIn: "100m"
            }
        );
        res.status(200).json({ accessToken });
    } else {
        res.status(400);
        throw new Error("No such student exists");
    }
});

const currentStudent = asyncHandler(async (req, res) => {
    const email = req.user.email;
    const student = await Student.findOne({ email });
    res.status(200).json({ student });
});

module.exports = { getStudents, getStudent, registerStudent, loginStudent, currentStudent };