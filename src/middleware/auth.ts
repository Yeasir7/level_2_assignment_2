import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";

const auth = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        throw new Error("You are not authorized");
      }
      const decode = jwt.verify(
        token as string,
        config.jwt_secret as string,
      ) as JwtPayload;
      console.log(decode);
      req.user = decode;

      if (roles.length && !roles.includes(decode.role)) {
        throw new Error("You are not authorized");
      }
      next();
    } catch (err: any) {
      res.status(401).json({
        success: false,
        message: err.message,
      });
    }
  };
};

export default auth