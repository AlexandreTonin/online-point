const Role = require("../models/Role");

async function GetRole(roleId) {
  const role = await Role.findOne({
    where: { id: roleId },
  });

  if (!role) {
    throw new Error(`Role with ID ${roleId} not found`);
  }

  return role;
}

module.exports = GetRole;
