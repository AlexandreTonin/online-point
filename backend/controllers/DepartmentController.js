const Department = require("../models/Department");
const CreateModel = require("../services/CreateModel");
const DeleteDepartment = require("../services/DeleteDepartment");
const GetDepartment = require("../services/GetDepartment");
const UpdateDepartment = require("../services/UpdateDepartment");

module.exports = class DepartmentController {
  static async createDepartment(req, res) {
    const departmentName = req.body.departmentName;

    if (!departmentName) {
      return res
        .status(400)
        .json({ success: false, error: "Department name is required" });
    }

    try {
      const newDepartment = await CreateModel(Department, { name: departmentName });
      return res.status(201).json({
        success: true,
        message: "Department created successfully",
        data: newDepartment,
      });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  }

  static async readDepartment(req, res) {
    const departmentId = req.params.id;

    try {
      const department = await GetDepartment(departmentId);
      return res.status(200).json(department);
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  }

  static async updateDepartment(req, res) {
    const departmentId = req.params.id;
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
      UpdateDepartment(departmentId, newData);
      return res
        .status(200)
        .json({
          success: true,
          departmentId,
          message: "Department updated sucessfully",
        });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  }

  static async deleteDepartment(req, res) {
    const departmentId = req.params.id;

    try {
      const department = await DeleteDepartment(departmentId);
      if (!department) {
        return res.status(404).json({
          message: `Department id ${departmentId} not exists on database`,
        });
      }
      return res.status(200).json({
        success: true,
        message: `Department ${departmentId} deleted sucessfully`,
      });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  }
};
