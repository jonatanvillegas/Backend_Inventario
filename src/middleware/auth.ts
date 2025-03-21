import { NextFunction, Request,Response } from "express";
import jwt from "../utils/jwt";

export default (req:Request,res:Response, next:NextFunction)=>{
     const token = req.headers.authorization?.split(" ")[1];
     if (!token ) {
        return res.status(400).json({"mensaje":"Token invalido"})
     }
     try {
        const data = jwt.verify(token)
        res.locals.payload = data
      
        return next();
     } catch (error) {
        return res.status(500).json({"mensaje":"invalido"})
     }
}