const Department = require("../models/Department");
const GetDepartment = require("./GetDepartment");

async function DeleteDepartment(departmentId) {
  try {
    const department = await GetDepartment(departmentId);
    if (!department) {
      throw new Error(`Department with ID ${departmentId} not found`);
    }
    await department.destroy();
    return department;
  } catch (error) {
    if (error.name === "SequelizeForeignKeyConstraintError") {
      throw new Error(
        `Cannot delete department with ID ${departmentId} because it has dependent records.`
      );
    } else {
      throw error;
    }
  }
}

module.exports = DeleteDepartment;
