const CheckEmail = require("../services/CheckEmail");
const CreateModel = require("../services/CreateModel");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/helpers/generateToken");
const GetEmployee = require("../services/GetEmployee");
const UpdateEmployee = require("../services/UpdateEmployee");
const GetEmployeeByToken = require("../services/GetEmployeeByToken");
const Employee = require("../models/Employee");

module.exports = class AuthController {
    static async Register(req, res) {
        const { name, roleId, departmentId, email, password } = req.body;

        if (!name) {
            return res.status(400).json({ success: false, error: "Name is required" });
        }

        if (!roleId) {
            return res.status(400).json({ success: false, error: "Role is required" });
        }

        if (!departmentId) {
            return res.status(400).json({ success: false, error: "Department is required" });
        }

        if (!email) {
            return res.status(400).json({ success: false, error: "Email is required" });
        }

        if (!password) {
            return res.status(400).json({ success: false, error: "Password is required" });
        }

        const emailExists = await CheckEmail(email)

        if (emailExists) {
            return res.status(400).json({ success: false, error: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        try {
            const newEmployee = await CreateModel(Employee, { name, roleId, departmentId, email, password: hashedPassword });
            const employeeId = newEmployee.id;
            const token = await generateToken(employeeId, email)
            res.cookie("token", token, { httpOnly: true, secure: true });
            res.json({ success: true, message: "User registered successfully", userId: employeeId, token: token });
        } catch (error) {
            if (error.name === 'SequelizeForeignKeyConstraintError') {
                res.status(400).json({ success: false, message: "Role or Department is not valid." });
            } else {
                res.status(500).json({ success: false, message: error.message });
            }
        }
    }

    static async Login(req, res) {
        const { email, password } = req.body

        if (!email) {
            return res.status(400).json({ success: false, error: "Email is required" });
        }

        if (!password) {
            return res.status(400).json({ success: false, error: "Password is required" });
        }

        const emailExists = await CheckEmail(email)

        if (!emailExists) {
            return res.status(400).json({ success: false, error: "This email is not registered" });
        }

        try {
            const employee = await GetEmployee(null, email)
            const employeeHashedPassword = employee.password;
            const passwordMatch = await bcrypt.compare(password, employeeHashedPassword)
            if (passwordMatch) {
                const token = generateToken(employee.id, email)
                res.cookie("token", token, { httpOnly: true, secure: true });
                const userbyToken = await GetEmployeeByToken(token)
                console.log(userbyToken)
                //res.json({ success: true, message: "Logged successfully", token: token });
                res.redirect("/");
            } else {
                res.json({ success: false, message: "Email or password is incorretly" });
            }
        } catch (error) {
            console.error(error)
            res.status(500).json({ success: false, message: error.message });
        }
    }

    static async Logout(req, res) {

        try {
            res.clearCookie("token");
            res.redirect("/");
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    static async ResetPassword(req, res) {
        // In the future I will add a token to confirm that the owner of the email entered to reset the password safely

        const { email, password } = req.body;

        if (!email) {
            return res.status(400).json({ success: false, error: "Email is required" });
        }

        if (!password) {
            return res.status(400).json({ success: false, error: "Password is required" });
        }

        const emailExists = await CheckEmail(email)
        if (!emailExists) {
            return res.status(400).json({ success: false, error: "This email is not registered" });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        try {
            const employeeUpdate = await UpdateEmployee(null, email, { password: hashedPassword });
            res.json({ success: true, message: "Password reset successfully" });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
};