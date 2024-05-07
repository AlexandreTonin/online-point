// imports
const express = require("express");
const cors = require("cors");
const db = require("./db/dbConnection");
const morgan = require("morgan");

// configs
const app = express();
app.set("json spaces", 3);
require("dotenv").config();

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("short"));

// models
const Department = require("./models/Department");
const Role = require("./models/Role");
const Employee = require("./models/Employee");
const Record = require("./models/Record");

// routes
const RecordRoutes = require("./routes/RecordRoutes");
const AuthRoutes = require("./routes/AuthRoutes");
const DepartmentRoutes = require("./routes/DepartmentRoutes");
const RoleRoutes = require("./routes/RoleRoutes");
app.use("/record", RecordRoutes);
app.use("/department", DepartmentRoutes);
app.use("/role", RoleRoutes);
app.use("/", AuthRoutes);

// server
app.listen(process.env.SERVER_PORT, () => {
  console.log("Servidor rodando na porta: ", process.env.SERVER_PORT);
  db.syncDatabase();
});
