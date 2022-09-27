const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();

const database = process.env.NODE_DB;
const user = process.env.NODE_DB_USERNAME;
const password = process.env.NODE_DB_PASSWORD;

const sequelize = new Sequelize(database, user, password, {
    host: "localhost",
    dialect: "mysql",
});

module.exports = sequelize;
