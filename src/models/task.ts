import db from "../db/connection";
import { DataTypes } from "sequelize";
import User from "./user";

const Task = db.define(
  "tb_task",
  {
    id_task: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    tsk_title: {
      type: DataTypes.STRING,
    },
    tsk_description: {
      type: DataTypes.STRING,
    },
    tsk_state: {
      type: DataTypes.STRING,
    },
    tsk_deadline: {
      type: DataTypes.DATE,
    },
  },
  {
    createdAt: false,
    updatedAt: false,
    freezeTableName: true,
  }
);

try {
  Task.belongsTo(User, { foreignKey: "user_id" });
} catch (error) {
  console.error("Error setting up associations:", error);
}
export default Task;
