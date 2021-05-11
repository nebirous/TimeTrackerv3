import { Sequelize } from "sequelize";

const db = new Sequelize('nodeTS', 'root', '1235648Aa', {
    host: 'localhost',
    dialect: 'mysql',
})

export default db;