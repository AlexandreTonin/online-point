const Role = require("../models/Role");
const GetRole = require("./GetRole");

async function DeleteRole(roleId) {
  try {
    const role = await GetRole(roleId);
    if (!role) {
      throw new Error(`Role with ID ${roleId} not found`);
    }
    await role.destroy();
    return role;
  } catch (error) {
    if (error.name === "SequelizeForeignKeyConstraintError") {
      throw new Error(
        `Cannot delete role with ID ${roleId} because it has dependent records.`
      );
    } else {
      throw error;
    }
  }
}

module.exports = DeleteRole;
