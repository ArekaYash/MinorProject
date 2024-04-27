const asyncHandler = require("express-async-handler");
const Project = require("../models/projectModel");

const getProjects = asyncHandler(async (req, res) => {
    const projects = await Project.find();
    res.status(200).json({ projects });
});

const getProject = asyncHandler(async (req, res) => {
    const project = await Project.findById(req.params.id)
        .populate('members mentors coordinators evaluators')
        .exec()
        .catch(err => {
            res.status(400);
            throw new Error("Failed to populate project");
        });

    if (!project) {
        res.status(400);
        throw new Error(`Project with id ${req.body.id} not found`);
    }
    res.status(200).json({ project });
})

//createProject expects the request to have the members, mentors and all reference objects to have their reference id as input
const createProject = asyncHandler(async (req, res) => {
    const { project_name, members, mentors, coordinators, evaluators } = req.body;
    if (!project_name || !members || !mentors || !coordinators || !evaluators) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const project = await Project.create({ project_name, members, mentors, coordinators, evaluators });
    if (project) {
        res.status(201).json({ project });
    } else {
        res.status(400);
        throw new Error("Failed to create project");
    }
})

module.exports = { getProjects, getProject, createProject };