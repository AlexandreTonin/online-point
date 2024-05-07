const CheckEmail = require("../services/CheckEmail");
const CreateEmployee = require("../services/CreateEmployee");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/helpers/generateToken");

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
            const newEmployee = await CreateEmployee(name, roleId, departmentId, email, hashedPassword);
            const employeeId = newEmployee.id;
            const token = await generateToken(employeeId, email)
            res.cookie("token", token, { httpOnly: true, secure: true});
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
        try {
            res.json({ success: true, message: "Logged successfully" });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    static async Logout(req, res) {
        try {
            res.json({ success: true, message: "Logout successfully" });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    static async ResetPassword(req, res) {
        try {
            res.json({ success: true, message: "User password reset successfully" });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
};