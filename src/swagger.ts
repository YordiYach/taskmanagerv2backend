import swaggerJSDoc from "swagger-jsdoc";
import path from "path";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "TaskManager API Documentation",
      version: "1.0.0",
      description: "A simple API to manage a TaskManager Application.",
    },

    servers: [
      {
        url: process.env.SERVER_URL || "http://localhost:3001",
      },
    ],
  },
  apis: [
    `${path.join(__dirname, "../src/routes/*.ts")}`,
    `${path.join(__dirname, "../src/models/*.ts")}`,
  ],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
