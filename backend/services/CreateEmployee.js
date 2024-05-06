const Employee = require("../models/Employee");

async function CreateEmployee(name, roleId, departmentId, email, password) {
    const newEmployee = await Employee.create({
        name,
        roleId,
        departmentId,
        email,
        password
    })

    return newEmployee;
}

module.exports = CreateEmployee;