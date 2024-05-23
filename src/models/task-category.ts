import { DataTypes } from "sequelize";
import sequelize from "../db/connection";
import Task from "./task";
import Category from "./category";

const TaskCategory = sequelize.define(
  "tb_taskcategory",
  {
    id_taskcategory: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    task_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    createdAt: false,
    updatedAt: false,
    freezeTableName: true,
  }
);

try {
  TaskCategory.belongsTo(Task, { foreignKey: "task_id", onDelete: "CASCADE" });
  TaskCategory.belongsTo(Category, { foreignKey: "category_id" });
} catch (error) {
  console.error("Error setting up associations:", error);
}

export default TaskCategory;
