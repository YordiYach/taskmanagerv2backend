import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/user";
import jwt from "jsonwebtoken";
import isAdmin from "../routes/validate-admin";

export interface IUser {
  id_user: number;
  usr_name: string;
  usr_email: string;
  usr_pass: string;
  id_usr_type: number;
}

export const getUsers = async (req: Request, res: Response) => {
  const users = await User.findAll();

  res.json(users);
};

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await User.findByPk(id);

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({
      msg: `User with id ${id} not found`,
    });
  }
};

export const deleteUser = [
  isAdmin,
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({
        msg: `User with id ${id} not found`,
      });
    } else {
      await user.destroy();
      res.json({
        msg: `User with id ${id} deleted`,
      });
    }
  },
];

export const updateUser = [
  isAdmin,
  async (req: Request, res: Response) => {
    try {
      const { body } = req;
      const { id } = req.params;

      // Validación de entrada
      if (!body || !id) {
        return res.status(400).json({ msg: "Invalid input" });
      }

      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).json({ msg: `User with id ${id} not found` });
      }

      let hashedPassword;

      if (body.usr_pass) {
        hashedPassword = await bcrypt.hash(body.usr_pass, 10);
      }

      await user.update({
        usr_name: body.usr_name,
        usr_email: body.usr_email,
        usr_pass: hashedPassword,
        id_usr_type: body.id_usr_type,
      });

      res.status(200).json({ msg: `User with id ${id} updated` });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Server error" });
    }
  },
];

export const newUser = [
  async (req: Request, res: Response) => {
    const { usr_name, usr_email, usr_pass, id_usr_type } = req.body;

    //Validate if the user already exists
    const user = (await User.findOne({
      where: { usr_email: usr_email },
    })) as IUser | null;

    if (user) {
      return res.status(400).json({
        msg: `User ${usr_email} already exists!`,
      });
    }

    const hashedPassword = await bcrypt.hash(usr_pass, 10);

    try {
      User.create({
        usr_name: usr_name,
        usr_email: usr_email,
        usr_pass: hashedPassword,
        id_usr_type: id_usr_type,
      });

      res.json({
        msg: `User ${usr_name} created successfully!`,
      });
    } catch (error) {
      res.status(400).json({
        msg: "Error creating user",
        error,
      });
    }
  },
];

export const loginUser = async (req: Request, res: Response) => {
  const { usr_email, usr_pass } = req.body;

  //Validate if the user already exists
  const user = (await User.findOne({
    where: { usr_email: usr_email },
  })) as IUser | null;

  if (!user) {
    return res.status(400).json({
      msg: `User ${usr_email} not found!`,
    });
  }

  const userId = user.id_user
  const username = user.usr_name

  //Validate if the password is correct
  const validPassword = await bcrypt.compare(usr_pass, user.usr_pass);

  if (!validPassword) {
    return res.status(400).json({
      msg: "Invalid password",
    });
  }

  //Generate token
  const token = jwt.sign(
    {
      usr_email: usr_email,
    },
    process.env.SECRET_KEY || "secret",
    {
      expiresIn: "1d",
    }
  );

  res.json({
    msg: "Logged in",
    token,
    userId,
    username
  });
};
