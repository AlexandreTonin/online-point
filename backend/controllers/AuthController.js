const CheckEmail = require("../services/CheckEmail");
const CreateEmployee = require("../services/CreateEmployee");
const bcrypt = require("bcrypt")

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
            res.json({ success: true, message: "User registered successfully", data: newEmployee });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
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