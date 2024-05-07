const Role = require("../models/Role");
const GetRole = require("./GetRole");

async function UpdateRole(roleId, roleNewData) {
  try {
    const role = await GetRole(roleId);

    await role.update(roleNewData);

    return role;
  } catch (error) {
    console.error("Error updating role:", error);
    throw error;
  }
}

module.exports = UpdateRole;
