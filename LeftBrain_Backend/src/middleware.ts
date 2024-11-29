import { NextFunction, Response, Request } from "express";
import jwt from "jsonwebtoken";

import { JWT_PASSWORD } from "./config";

export const UserMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const header = req.headers["authorization"];
  const decoded = jwt.verify(header as string, JWT_PASSWORD);
  if(decoded){
    // overide the types of the express request object 
    //@ts-ignore
    req.userId = decoded.id;
    next()
  }else{
    res.status(403).json({
        msg:"You are not logged in"
    })
  }
};
