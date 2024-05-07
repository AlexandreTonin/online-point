const Employee = require("../models/Employee");
const {Sequelize} = require('sequelize')

async function GetEmployee(employeeId, employeeEmail) {
    const employee = await Employee.findOne({
        where: {
            [Sequelize.Op.or]: [
                { id: employeeId },
                { email: employeeEmail }
            ]
        }
    });

    if (!employee) {
        throw new Error(`Employee with ID ${employeeId} not found`);
    }

    return employee;
}

module.exports = GetEmployee;
