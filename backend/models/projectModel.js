const mongoose = require("mongoose");

const projectSchema = mongoose.Schema({
    project_name: {
        type: String,
        required: [true, "Please add a project name"]
    },
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student'
        }
    ],
    mentors: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Teacher'
        }
    ],
    coordinators: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Teacher'
        }
    ],
    evaluators: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Teacher'
        }
    ]
})

module.exports = mongoose.model('Project', projectSchema);