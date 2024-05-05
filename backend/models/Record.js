const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/dbConnection");
const Employee = require("./Employee");

const Record = sequelize.define("Record", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  record: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

Record.belongsTo(Employee, { foreignKey: "employeeId" });

module.exports = Record;
