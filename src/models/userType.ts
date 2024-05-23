import db from "../db/connection";
import { DataTypes } from "sequelize";

const UserType = db.define(
  "tb_usertype",
  {
    id_usertype: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    usertype_desc: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    createdAt: false,
    updatedAt: false,
    freezeTableName: true,
  }
);

export default UserType;
