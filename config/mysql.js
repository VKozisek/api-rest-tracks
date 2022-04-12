const { Sequelize } = require("sequelize");

const dataBase = process.env.MYSQL_DATABASE;
const userName = process.env.MYSQL_USER;
const password = process.env.MYSQL_PASSWORD;
const host = process.env.MYSQL_HOST;

const sequelize = new Sequelize(dataBase, userName, password, {
  host,
  dialect: "mysql",
});

const dbConnectMySql = async () => {
  try {
    await sequelize.authenticate();
    console.log("MYSQL Conexion Correcta");
  } catch (error) {
    console.log("MYSQL Error de Conexion", error);
  }
};

module.exports = { sequelize, dbConnectMySql };
