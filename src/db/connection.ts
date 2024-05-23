import { Sequelize } from "sequelize";

const sequelize = new Sequelize(process.env.MYSQL_URL || "dbUrl");

export default sequelize;
