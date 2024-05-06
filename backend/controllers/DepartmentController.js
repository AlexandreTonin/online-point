const Department = require("../models/Department");
const CreateDepartment = require("../services/CreateDepartment");

module.exports = class DepartmentController {
    static async createDepartment(req, res) {
        const departmentName = req.body.departmentName;

        if (!departmentName) {
            return res.status(400).json({ success: false, error: "Department name is required" });
        }

        try {
            const newDepartment = await CreateDepartment(departmentName);
            return res.status(201).json({ success: true, message: "Department created successfully", data: newDepartment });
        } catch (error) {
            return res.status(500).json({ success: false, error: error.message });
        }
    }

    static async getDepartment(req, res) {
    }

    static async updateDepartment(req, res) {
    }

    static async deleteDepartment(req, res) {
    }
};