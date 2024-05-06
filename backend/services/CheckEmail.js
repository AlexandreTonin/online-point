const Employee = require("../models/Employee");

async function CheckEmail(email) {
    const emailExists = await Employee.findOne({
        where: {
            email: email
        }
    });

    return emailExists;
}

module.exports = CheckEmail;