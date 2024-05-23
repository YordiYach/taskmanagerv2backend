import { Request, Response } from "express";
import Category from '../models/category';

export const getCategories = async (req: Request, res: Response) => {
  const listCategories = await Category.findAll();
  res.json(listCategories);
};

export const getCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  const category = await Category.findByPk(id);

  if (category) {
    res.json(category);
  } else {
    res.status(404).json({
      msg: `Category with id ${id} not found`,
    });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  const category = await Category.findByPk(id);

  if (!category) {
    return res.status(404).json({
      msg: `Category with id ${id} not found`,
    });
  } else {
    await category.destroy();
    res.json({
      msg: `Category with id ${id} deleted`,
    });
  }
};

export const addCategory = async (req: Request, res: Response) => {
  const { body } = req;

  try {
    await Category.create(body);

    res.json({
      msg: "Category added successfully",
    });
  } catch (error) {
    console.log(error);
    res.json({
      msg: "An error occurred while adding the category",
    });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  const { body } = req;
  const { id } = req.params;

  const category = await Category.findByPk(id);

  try {
    if (category) {
      await category.update(body);
      res.json({
        msg: "Category updated successfully",
      });
    } else {
      res.status(400).json({
        msg: "Category not found",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      msg: "An error occurred while adding the Category",
    });
  }
};
