import { NextFunction, Request, Response } from "express";

//Extends Class of Error permit to create a custom error
export class ApiError extends Error{


  status: number; // status Error
  details?: Record<string, any>; // Details Error <nameError, error>
  
  constructor (message: string, status: number, details?:Record<string, any>){
     super(message);
     this.status = status;
     this.details = details;
  }

}


 export default function errorHandler(error:Error, _req: Request, res: Response, _next: NextFunction) {
    if(error instanceof ApiError){
        res.status(error.status).json({
            ok: false,
            error :{
                message: error.message,
                details: error.details
            },
        });
    }else{
        res.status(500).json({
            ok:false,
            error:{
                message: "Error internal on Server"
            }
        });
    }
  }
