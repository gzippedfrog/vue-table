const { DataTypes } = require("sequelize");

const sequelize = require("../config/database");

const Item = sequelize.define(
    "Item",
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        date: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
        },
        distance: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        amount: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
    },
    {
        timestamps: false,
    }
);

module.exports = Item;
