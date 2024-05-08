const Employee = require("../models/Employee");
const GetEmployee = require("./GetEmployee");

async function UpdateEmployee(employeeId, employeeEmail, data) {
    try {
        const employee = await GetEmployee(employeeId, employeeEmail);

        await employee.update(data);

        return employee;
    } catch (error) {
        console.error("Error updating employee:", error);
        throw error;
    }
}

module.exports = UpdateEmployee;
