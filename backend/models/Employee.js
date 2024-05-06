const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/dbConnection");
const Role = require("./Role"); // Importando o modelo Role
const Department = require("./Department"); // Importando o modelo Department

const Employee = sequelize.define("Employee", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    // Adicionando as referências de chave estrangeira (FK)
    roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Role',
            key: 'id'
        }
    },
    departmentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Department',
            key: 'id'
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

// Definindo as relações entre as tabelas
Employee.belongsTo(Role, { foreignKey: 'roleId', as: 'role' });
Employee.belongsTo(Department, { foreignKey: 'departmentId', as: 'department' });

module.exports = Employee;
