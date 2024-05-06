const CreateRole = require("../services/CreateRole");

module.exports = class RoleController {
    static async createRole(req, res) {
        const roleName = req.body.roleName;

        if (!roleName) {
            return res.status(400).json({ success: false, error: "Role name is required" });
        }

        try {
            const newRole = await CreateRole(roleName);
            return res.status(201).json({ success: true, message: "Role created successfully", data: newRole });
        } catch (error) {
            return res.status(500).json({ success: false, error: error.message });
        }
    }

    static async getRole(req, res) {
    }

    static async updateRole(req, res) {
    }

    static async deleteRole(req, res) {
    }
};