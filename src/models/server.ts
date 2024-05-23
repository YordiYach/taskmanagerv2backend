import express, { Application, Request, Response } from "express";
import routesTask from "../routes/task";
import routesUser from "../routes/user";
import routesCategory from "../routes/category";
import routesTaskCategory from "../routes/task-category";
import db from "../db/connection";
import Task from "./task";
import User from "./user";
import UserType from "./userType";
import Category from "./category";
import TaskCategory from "./task-category";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "../swagger";

class Server {
  private app: express.Application;
  private port: string;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "3001";
    this.listen();
    this.middlewares();
    this.routes();
    this.dbConnect();
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Application is running on port ${this.port}`);
    });
  }

  routes() {

    //Swagger documentation
/**
 * @swagger
 * components:
 *  securitySchemes:
 *    bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *  security:
 *  - bearerAuth: []
 *  schemas:
 *    Task:
 *      type: object
 *      properties:
 *        id_task:
 *          type: integer
 *          description: Autoincremental por defecto
 *        tsk_title:
 *          type: string
 *          description: Nombre de la tarea
 *        tsk_description:
 *          type: Number
 *          description: Descricion de la tarea
 *        tsk_state:
 *          type: string
 *          description: Estado de la tarea
 *        tsk_deadline:
 *          type: date
 *          description: Fecha limite de la tarea
 *      required:
 *        - tsk_title
 *        - tsk_description
 *        - tsk_state
 *        - tsk_deadline
 *      example:
 *        tsk_title: Creación de API
 *        tsk_description: API para ventas
 *        tsk_state: En proceso
 *        tsk_deadline: 2024-05-20
 *    Category:
 *      type: object
 *      properties:
 *        id_category:
 *          type: integer
 *          description: ID de la categoria, autoincremental por defecto
 *        cat_description:
 *          type: integer
 *          description: Descripción de la categoria
 *      required:
 *        - cat_description
 *      example:
 *        cat_description: Prioridad alta
 *    TaskCategory:
 *      type: object
 *      properties:
 *        id_taskcategory:
 *          type: integer
 *          description: ID de la categoria de la tarea, autoincremental por defecto
 *        task_id:
 *          type: integer
 *          description: ID de la tarea
 *        category_id:
 *          type: integer
 *          description: ID de la categoria
 *      required:
 *        - task_id
 *        - category_id
 *      example:
 *        task_id: 1
 *        category_id: 3
 *    User:
 *      type: object
 *      properties:
 *        id_user:
 *          type: integer
 *          description: Autoincremental por defecto
 *        usr_name:
 *          type: string
 *          description: Nombre del usuario
 *        usr_email:
 *          type: Number
 *          description: Correo del usuario
 *        usr_pass:
 *          type: integer
 *          description: Contraseña del usuario
 *        id_usr_type:
 *          type: integer
 *          description: Tipo de usuario
 *      required:
 *        - usr_name
 *        - usertype_desc
 *        - usr_email
 *        - usr_pass
 *        - id_usr_type  
 *      example:
 *        usr_name: Juan Pérez
 *        usr_email: juan@correo.com
 *        usr_pass: "123456"
 *        id_usr_type: 1
 *    UserType:
 *      type: object
 *      properties:
 *        id_usertype:
 *          type: integer
 *          description: ID de tipo de usuario, autoincremental por defecto
 *        usertype_desc:
 *          type: integer
 *          description: Tipo de usuario
 *      required:
 *        - usertype_desc
 *      example:
 *        usertype_desc: Administrador
 *    Login:
 *      type: object
 *      properties:
 *        usr_email:
 *          type: string
 *          description: Correo del usuario
 *        usr_pass:
 *          type: string
 *          description: Contraseña del usuario
 *      required:
 *        - usr_email
 *        - usr_pass
 *      example:
 *        usr_email: manuel@correo.com
 *        usr_pass: "12345"
 */

    this.app.get("/", (req: Request, res: Response) => {
      res.json({
        msg: "API WORKING",
      });
    });
    this.app.use("/api/tasks", routesTask);
    this.app.use("/api/users", routesUser);
    this.app.use("/api/categories", routesCategory);
    this.app.use("/api/tasks-categories", routesTaskCategory);
    this.app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  }

  middlewares() {
    this.app.use(express.json());
  }

  async dbConnect() {
    try {
      await db.authenticate();
      console.log("Database connected!");
      await Task.sync();
      await User.sync();
      await UserType.sync();
      await Category.sync();
      await TaskCategory.sync();
    } catch (error) {
      console.log(error);
      console.log("Error connecting to the database!");
    }
  }
}

export default Server;
