// imports
const express = require('express')
const cors = require("cors")
const db = require("./db/dbConnection");

// configs
const app = express();
app.set("json spaces", 3);
require("dotenv").config();

// middlewares
app.use(cors());
app.use(express.json());

// models
const Department = require('./models/Department');
const Role = require('./models/Role');
const Employee = require('./models/Employee');

// routes
const ExampleRoutes = require('./routes/ExampleRoutes');
app.use('/examples', ExampleRoutes)

app.get("/", (req, res) => {
    res.status(200).json({ rota: "/" });
});

// server
app.listen(process.env.SERVER_PORT, () => {
    console.log("Servidor rodando na porta: ", process.env.SERVER_PORT);
    db.syncDatabase();
});

