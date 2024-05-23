import { Request, Response } from "express";
import TaskCategory from "../models/task-category";
import Task from "../models/task";
import Category from "../models/category";
import User from "../models/user";

export const getTaskCategories = async (req: Request, res: Response) => {
  try {
    const taskCategories = await TaskCategory.findAll({
      include: [
        {
          model: Task,
          attributes: { include: [] },
        },
        {
          model: Category,
          attributes: { include: [] },
        },
      ],
    });

    return res.status(200).json(taskCategories);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Server error" });
  }
};

export const addTaskCategory = async (req: Request, res: Response) => {
  const { body } = req;

  try {
    const newTaskCategory = await TaskCategory.create(body);

    return res.status(201).json({
      msg: "Task category added successfully",
      taskCategory: newTaskCategory,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "An error occurred while adding the task category",
    });
  }
};

export const updateTaskCategory = async (req: Request, res: Response) => {
  const { body } = req;
  const { id } = req.params;

  try {
    const taskCategory = await TaskCategory.findByPk(id);

    if (!taskCategory) {
      return res.status(404).json({
        msg: `Task category with id ${id} not found`,
      });
    }

    const updatedTaskCategory = await taskCategory.update(body);

    return res.status(200).json({
      msg: `Task category with id ${id} updated`,
      taskCategory: updatedTaskCategory,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "An error occurred while updating the task category",
    });
  }
};

export const getTaskCategoriesByUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    // Check if user exists
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Get tasks with categories by user
    const tasks = await TaskCategory.findAll({
      include: [
        {
          model: Task,
          attributes: { include: [] },
          where: { user_id: id },
          include: [
            {
              model: User,
              attributes: ["usr_name"],
            },
          ],
        },
        {
          model: Category,
          attributes: { include: [] },
        },
      ],
    });

    return res.json(tasks);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "An error occurred while getting the tasks with categories",
    });
  }
};
