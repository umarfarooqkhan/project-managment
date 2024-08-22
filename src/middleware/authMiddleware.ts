import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import jwtConfig from '../config/jwtConfig'; // Adjust path as needed

// Define a type for the JWT payload
interface JwtPayload {
  id: number;
  email: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  // Get the authorization header from the request
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1]; // Extract token from "Bearer <token>"

  if (token == null) {
    return res.status(401).json({ message: 'No token provided' });
  }

  // Verify the token
  jwt.verify(token, jwtConfig.secret, (err, decoded) => {
    if (err || !decoded) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    // Attach user information to the request object
    req.body.loggedInUser = decoded as JwtPayload;

    next();
  });
};
