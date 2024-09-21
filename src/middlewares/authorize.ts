import { NextFunction, Response } from "express";
import { AuthRequest } from "./authentication";
import { ApiError } from "./error";

export function authorize(...allowedRoles: string[]) {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || !req.user.id) {
      return next(new ApiError("No autorizado", 401));
    }

    if (!req.user.role) {
      return next(new ApiError("Rol no definido", 401));
    }

    if (allowedRoles.includes(req.user.role)) {
      return next();
    } else {
      next(new ApiError("Acceso denegado", 403));
    }
  };
}