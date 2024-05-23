import { Router } from "express";
import {
  getTasks,
  deleteTask,
  addTask,
  updateTask,
  getTaskById,
  getTaskByUser,
} from "../controllers/task";
import validateToken from "./validate-token";

const router = Router();

/**
 * @swagger
 * /api/tasks:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: Retorna todas las tareas registradas
 *    tags: [Tasks]
 *    responses:
 *      200:
 *        description: Se ha obtenido el registro de tareas
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Task'
 *      404:
 *        description: No se encontraron tareas registradas
 */
router.get("/", validateToken, getTasks);


/**
 * @swagger
 * /api/tasks/{id}:
 *  delete:
 *    security:
 *      - bearerAuth: []
 *    summary: Elimina una tarea
 *    tags: [Tasks]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: ID tarea
 *    responses:
 *      200:
 *        description: Se ha eliminado la tarea
 *      404:
 *        description: Tarea no encontrada.
 */
router.delete("/:id", validateToken, deleteTask);

/**
 * @swagger
 * /api/tasks:
 *  post:
 *    security:
 *      - bearerAuth: []
 *    summary: Agrega una tarea
 *    tags: [Tasks]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Task'
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
router.post("/", validateToken, addTask);

/**
 * @swagger
 * /api/tasks/{id}:
 *  put:
 *    security:
 *      - bearerAuth: []
 *    summary: Actualiza una tarea
 *    tags: [Tasks]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: ID de la tarea
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Task'
 *    responses:
 *      200:
 *        description: Tarea actualizada
 *      404:
 *        description: Tarea no encontrada
 */
router.put("/:id", validateToken, updateTask);

/**
 * @swagger
 * /api/tasks/{id}:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: Retorna una tarea registrada por ID
 *    tags: [Tasks]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: ID Tarea
 *    responses:
 *      200:
 *        description: Se ha obtenido el registro la tarea
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Task'
 *      404:
 *        description: tarea no encontrada
 */
router.get("/:id", validateToken, getTaskById);


/**
 * @swagger
 * /api/tasks/user/{id}:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: Retorna una tarea registrada por ID de usuario
 *    tags: [Tasks]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: ID Usuario
 *    responses:
 *      200:
 *        description: Se ha obtenido el registro de tareas del usuario
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Task'
 *      404:
 *        description: Tareas no encontradas para este usuario
 */
router.get("/user/:id", validateToken, getTaskByUser);
export default router;
