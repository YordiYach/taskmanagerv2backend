import { Router } from "express";
import {
  getTaskCategories,
  addTaskCategory,
  updateTaskCategory,
  getTaskCategoriesByUser,
} from "./../controllers/task-category";
import validateToken from "./validate-token";

const router = Router();

/**
 * @swagger
 * /api/tasks-categories:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: Retorna todas las tareas registradas por categoría
 *    tags: [TaskCategories]
 *    responses:
 *      200:
 *        description: Se ha obtenido el registro de tareas por categoría
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/TaskCategory'
 *      404:
 *        description: No se encontraron tareas registradas
 */
router.get("/", validateToken, getTaskCategories);

/**
 * @swagger
 * /api/tasks-categories/user/{id}:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: Retorna todas las tareas registradas por categoría de un usuario
 *    tags: [TaskCategories]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: ID de usuario
 *    responses:
 *      200:
 *        description: Se ha obtenido el registro de tareas por categoría de un usuario
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/TaskCategory'
 *      404:
 *        description: No se encontraron tareas registradas por categoría de un usuario
 */
router.get("/user/:id", validateToken, getTaskCategoriesByUser)

/**
 * @swagger
 * /api/tasks-categories:
 *  post:
 *    security:
 *      - bearerAuth: []
 *    summary: Agrega una tarea por categoría
 *    tags: [TaskCategories]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/TaskCategory'
 *    responses:
 *      201:
 *        description: Tarea creada.
 *      500:
 *        description: Error en el servidor.
 *      400:
 *        description: Error en la petición.
 *      401:
 *       description: No autorizado.
 *      403:
 *       description: Prohibido.
 *      404:
 *       description: No encontrado.
 */
router.post("/", validateToken, addTaskCategory);

/**
 * @swagger
 * /api/tasks-categories/{id}:
 *  put:
 *    security:
 *      - bearerAuth: []
 *    summary: Actualiza una tarea por categoría
 *    tags: [Tasks]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: ID de la tarea categorizada
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/TaskCategory'
 *    responses:
 *      200:
 *        description: Categoría de tarea actualizada
 *      404:
 *        description: Tarea no encontrada
 */
router.put("/:id", validateToken, updateTaskCategory);

export default router;