import { Router } from "express";
import {
  getCategories,
  getCategory,
  deleteCategory,
  addCategory,
  updateCategory,
} from "../controllers/category";
import validateToken from "./validate-token";

const router = Router();

/**
 * @swagger
 * /api/categories:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: Retorna todas las categorías registradas
 *    tags: [Categories]
 *    responses:
 *      200:
 *        description: Se ha obtenido el registro de categorias
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Category'
 *      404:
 *        description: No se encontraron categorías registradas
 */
router.get("/", validateToken, getCategories);

/**
 * @swagger
 * /api/categories/{id}:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: Retorna una categoría registrada por ID
 *    tags: [Categories]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: ID Categoría
 *    responses:
 *      200:
 *        description: Se ha obtenido el registro la categoría
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Category'
 *      404:
 *        description: Categoría no encontrada
 */
router.get("/:id", validateToken, getCategory);

/**
 * @swagger
 * /api/categories/{id}:
 *  delete:
 *    security:
 *      - bearerAuth: []
 *    summary: Elimina una categoría
 *    tags: [Categories]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: ID Categoria
 *    responses:
 *      200:
 *        description: Se ha eliminado la categoría
 *      404:
 *        description: Categoría no encontrada.
 */
router.delete("/:id", validateToken, deleteCategory);

/**
 * @swagger
 * /api/categories:
 *  post:
 *    security:
 *      - bearerAuth: []
 *    summary: Agrega una categoría
 *    tags: [Categories]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Category'
 *    responses:
 *      201:
 *        description: Categoría creada.
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
router.post("/", validateToken, addCategory);

/**
 * @swagger
 * /api/categories/{id}:
 *  put:
 *    security:
 *      - bearerAuth: []
 *    summary: Actualiza una categoría
 *    tags: [Categories]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: ID de la categoría
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Category'
 *    responses:
 *      200:
 *        description: Categoria actualizada
 *      404:
 *        description: Categoria no encontrada
 */
router.put("/:id", validateToken, updateCategory);

export default router;
