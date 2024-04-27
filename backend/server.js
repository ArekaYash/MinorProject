const express = require("express");
const app = express();
const cors = require('cors');
const dotenv = require("dotenv").config();
const connectDb = require("../backend/config/dbConnection");
const errorHandler = require("./controllers/middleware/errorHandler");
const port = process.env.port || 5000;

app.use(cors());
connectDb();
app.use(errorHandler);


app.use(express.json());
app.use("/api/students", require("./routes/studentRoutes"));
app.use("/api/teachers", require("./routes/teacherRoutes"));
app.use("/api/projects", require("./routes/projectRoutes"));

app.listen(port, () => {
    console.log(`LISTENING ON PORT ${port}`);
});