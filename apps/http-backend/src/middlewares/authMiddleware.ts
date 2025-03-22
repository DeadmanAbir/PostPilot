import { Request, Response, NextFunction, RequestHandler } from "express";
import createError from "http-errors";
import jwt from "jsonwebtoken";
import "dotenv/config";

export interface AuthRequest extends Request {
  userId: string;
  displayName?: string;
  email?: string;
}

declare global {
  namespace Express {
    interface Request {
      userId: string;
      displayName?: string;
      email?: string;
    }
  }
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer")) {
      throw createError(
        401,
        "Unauthorized: Missing or invalid Authorization header."
      );
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      throw createError(401, "Unauthorized: Token not provided.");
    }

    const secret = process.env.SUPABASE_JWT_SECRET;
    if (!secret) {
      throw createError(500, "Internal Server Error: Missing JWT secret.");
    }

    const decoded = jwt.verify(token, secret);

    if (
      typeof decoded === "string" ||
      !decoded.sub ||
      !decoded.email ||
      !decoded.role ||
      decoded.role !== "authenticated"
    ) {
      throw createError(401, "Unauthorized: Invalid token payload.");
    }

    req.userId = decoded.sub;
    req.email = decoded.email;
    req.displayName = decoded.user_metadata?.displayName;

    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(403).json({ error: "Unauthorized: Invalid token" });
    }

    next(error);
  }
};
