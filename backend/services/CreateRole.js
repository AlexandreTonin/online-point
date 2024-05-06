const Role = require("../models/Role");

async function CreateRole(roleName) {
    const newRole = await Role.create({
        name: roleName
    });

    return newRole;
}

module.exports = CreateRole;