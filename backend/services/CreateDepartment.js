const Department = require("../models/Department");

async function CreateDepartment(departmentName) {
    const newDepartment = await Department.create({
        name: departmentName
    });

    return newDepartment;
}

module.exports = CreateDepartment;