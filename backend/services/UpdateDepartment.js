const Department = require("../models/Department");
const GetDepartment = require("./GetDepartment");

async function UpdateDepartment(departmentId, departmentNewData) {
  try {
    const department = await GetDepartment(departmentId);

    await department.update(departmentNewData);
    
    return department;
  } catch (error) {
    console.error("Error updating department:", error);
    throw error;
  }
}

module.exports = UpdateDepartment;
