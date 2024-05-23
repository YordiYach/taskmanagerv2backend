import { DataTypes } from "sequelize";
import sequelize from "../db/connection";
import UserType from "./userType";

const User = sequelize.define(
  "tb_user",
  {
    id_user: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    usr_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    usr_email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    usr_pass: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id_usr_type: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: "2",
    },
  },
  {
    createdAt: false,
    updatedAt: false,
    freezeTableName: true,
  }
);

try {
  User.belongsTo(UserType, { foreignKey: "id_usr_type" });
} catch (error) {
  console.error("Error setting up associations:", error);
}

export default User;
