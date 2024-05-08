const jwt = require('jsonwebtoken');
const GetEmployee = require('./GetEmployee');
require('dotenv').config()

async function GetEmployeeByToken(token) {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const employee = await GetEmployee(userId, null);

    return employee.dataValues.name;
}

module.exports = GetEmployeeByToken;