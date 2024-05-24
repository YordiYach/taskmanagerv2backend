import { Router } from "express";
import {
  newUser,
  loginUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/user";
import validateToken from "./validate-token";

const router = Router();




/**
 * @swagger
 * /api/users:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: Retorna todas los usuarios registrados
 *    tags: [Users]
 *    responses:
 *      200:
 *        description: Se ha obtenido el registro de usuarios
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Task'
 *      404:
 *        description: No se encontraron usuarios registrados
 */

router.get("/", validateToken, getUsers);

/**
 * @swagger
 * /api/users/{id}:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: Retorna todas los usuarios registrados
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: ID Usuario
 *    responses:
 *      200:
 *        description: Se ha obtenido el registro del usuario
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Task'
 *      404:
 *        description: Usuario no encontrado
 */

router.get("/:id", validateToken, getUser);

/**
 * @swagger
 * /api/users/{id}:
 *  delete:
 *    security:
 *      - bearerAuth: []
 *    summary: Elimina un usuario
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: ID Usuario
 *    responses:
 *      200:
 *        description: Se ha eliminado el usuario
 *      404:
 *        description: Usuario no encontrado.
 */
router.delete("/:id", validateToken, deleteUser);

/**
 * @swagger
 * /api/users/{id}:
 *  put:
 *    security:
 *      - bearerAuth: []
 *    summary: Actualiza un usuario
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: ID del usuario
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      200:
 *        description: Usuario actualizado
 *      404:
 *        description: Usuario no encontrado
 */
router.put("/:id", validateToken, updateUser);

/**
 * @swagger
 * /api/users:
 *  post:
 *    security:
 *      - bearerAuth: []
 *    summary: Agrega un usuario
 *    tags: [Users]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      201:
 *        description: Usuario creado.
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
router.post("/", newUser);

/**
 * @swagger
 * /api/users/login:
 *  post:
 *    summary: Inicio de sesión
 *    tags: [Login]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Login'
 *    responses:
 *      200:
 *        description: Sesión iniciada.
 *      401:
 *        description: Credenciales incorrectas.
 *      500:
 *       description: Error en el servidor.
 */
router.post("/login", loginUser);

export default router;
