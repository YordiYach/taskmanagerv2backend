import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user";
import { IUser } from "../controllers/user";

const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("authorization");
  if (!token) return res.status(403).json({ msg: "No token provided" });

  try {
    const decoded = jwt.verify(token.slice(7), process.env.SECRET_KEY || "secret") as any;
    const user = (await User.findOne({
      where: { usr_email: decoded.usr_email },
    })) as IUser | null;

    if (!user || user.id_usr_type !== 1) {
      return res.status(403).json({ msg: "User is not an admin" });
    }
    next();
  } catch (error) {
    return res.status(403).json({ msg: "Failed to authenticate token", error });
  }
};

export default isAdmin;