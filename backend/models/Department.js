const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/dbConnection");

const Department = sequelize.define("Department", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

module.exports = Department;
