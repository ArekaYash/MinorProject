const mongoose = require("mongoose");

const studentSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please add a student name"]
        },
        sap_id: {
            type: String,
            required: [true, "Please add a SAP ID"]
        },
        email: {
            type: String,
            required: [true, "Please add a student email"]
        },
        password: {
            type: String,
            required: [true, "Please add a password"]
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Student", studentSchema);