import { Request, Response } from "express";
import Task from "../models/task";
import User from "../models/user";

export const getTasks = async (req: Request, res: Response) => {
  const listTasks = await Task.findAll();
  res.json(listTasks);
};

export const getTaskByUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    // Check if user exists
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Get tasks by user
    const listTasks = await Task.findAll({ where: { user_Id: id } });

    // If no tasks found, return a message
    if (listTasks.length === 0) {
      return res.status(404).json({ msg: "No tasks found for this user" });
    }

    // Return the tasks
    return res.status(200).json(listTasks);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Server error" });
  }
};

export const getTaskById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const task = await Task.findOne({
      where: { id_task: id },
      include: [
        {
          model: User,
          required: true, // this will make an INNER JOIN
          attributes: ["usr_name"],

          // Specify which columns you want to retrieve
          // attributes: ['usr_name', 'usr_email'],

          // Exclude some columns
          // attributes: { exclude: ['usr_pass'] },

          // Include all columns except some
          // attributes: { exclude: ['usr_pass'] },

          // Include all columns
          // attributes: { include: [] },
        },
      ],
    });

    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    return res.status(200).json(task);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Server error" });
  }
};

/*export const getTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  const task = await Task.findByPk(id);

  if (task) {
    res.json(task);
  } else {
    res.status(404).json({
      msg: `Task with id ${id} not found`,
    });
  }
};*/

export const deleteTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  const task = await Task.findByPk(id);

  if (!task) {
    return res.status(404).json({
      msg: `Task with id ${id} not found`,
    });
  } else {
    await task.destroy();
    res.json({
      msg: `Task with id ${id} deleted`,
    });
  }
};

export const addTask = async (req: Request, res: Response) => {
  const { body } = req;

  try {
    await Task.create(body);

    res.json({
      msg: "Task added successfully",
    });
  } catch (error) {
    console.log(error);
    res.json({
      msg: "An error occurred while adding the task",
    });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  const { body } = req;
  const { id } = req.params;

  const task = await Task.findByPk(id);

  try {
    if (task) {
      await task.update(body);
      res.json({
        msg: "Task updated successfully",
      });
    } else {
      res.status(400).json({
        msg: "task not found",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      msg: "An error occurred while adding the task",
    });
  }
};
