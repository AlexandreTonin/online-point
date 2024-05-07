const CreateRole = require("../services/CreateRole");
const DeleteRole = require("../services/DeleteRole");
const GetRole = require("../services/GetRole");
const UpdateRole = require("../services/UpdateRole");

module.exports = class RoleController {
  static async createRole(req, res) {
    const roleName = req.body.roleName;

    if (!roleName) {
      return res
        .status(400)
        .json({ success: false, error: "Role name is required" });
    }

    try {
      const newRole = await CreateRole(roleName);
      return res.status(201).json({
        success: true,
        message: "Role created successfully",
        data: newRole,
      });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  }

  static async readRole(req, res) {
    const roleId = req.params.id;

    try {
      const role = await GetRole(roleId);
      return res.status(200).json(role);
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  }

  static async updateRole(req, res) {
    const roleId = req.params.id;
    const newData = req.body;

    if (!req.body.name) {
      return res
        .status(400)
        .json({ success: false, message: "Name is required" });
    }

    if (req.body.id) {
      return res
        .status(400)
        .json({ success: false, message: "It's not possible update ID" });
    }

    try {
      UpdateRole(roleId, newData);
      return res.status(200).json({
        success: true,
        roleId,
        message: "Role updated sucessfully",
      });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  }

  static async deleteRole(req, res) {
    const roleId = req.params.id;

    try {
      const role = await DeleteRole(roleId);

      if (!role) {
        return res.status(404).json({
          message: `Role id ${roleId} not exists on database`,
        });
      }
      return res.status(200).json({
        success: true,
        message: `Role ${roleId} deleted sucessfully`,
      });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  }
};
