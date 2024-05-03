const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/dbConnection");

const Role = sequelize.define("Role", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

module.exports = Role;
