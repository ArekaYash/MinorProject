const mongoose = require("mongoose");

const teacherSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Teacher name is required"]
        },
        sap_id: {
            type: String,
            required: [true, "Sap_ID required"]
        },
        email: {
            type: String,
            required: [true, "Teacher email required"]
        },
        password: {
            type: String,
            required: [true, "Password required"]
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Teacher", teacherSchema);