import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  const headerToken = req.header("authorization");

  if (headerToken != undefined && headerToken.startsWith("Bearer ")) {
    try {
      const bearerToken = headerToken.slice(7, headerToken.length);
      jwt.verify(bearerToken, process.env.SECRET_KEY || "secret");
      next();
    } catch (error) {
      res.status(401).json({
        msg: "Invalid token",
      });
    }
  } else {
    res.status(401).json({
      msg: "Access denied!",
    });
  }
};

export default validateToken;
