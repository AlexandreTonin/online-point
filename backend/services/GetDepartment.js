const Department = require("../models/Department");

async function GetDepartment(departmentId) {
  const department = await Department.findOne({
    where: { id: departmentId },
  });

  if (!department) {
    throw new Error(`Department with ID ${departmentId} not found`);
  }

  return department;
}

module.exports = GetDepartment;
