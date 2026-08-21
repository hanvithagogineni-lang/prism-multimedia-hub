import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from '../config/db';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

export const authenticateJWT = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Access token required' });
  }

  const token = authHeader.split(' ')[1];
  const secret = process.env.JWT_SECRET || 'prism_multimedia_super_secret_jwt_key_2026';

  try {
    const decoded = jwt.verify(token, secret) as { id: string; email: string; role: string };
    
    // Verify user exists in database
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      include: { role: true }
    });

    if (!user || user.status !== 'Active') {
      return res.status(401).json({ success: false, message: 'Invalid token or inactive account' });
    }

    req.user = {
      id: user.id,
      email: user.email,
      role: user.role.name
    };

    next();
  } catch (error) {
    return res.status(403).json({ success: false, message: 'Invalid or expired token' });
  }
};

export const requireRole = (allowedRoles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Unauthenticated' });
    }

    if (!allowedRoles.includes(req.user.role) && req.user.role !== 'SUPER_ADMIN') {
      return res.status(403).json({ success: false, message: 'Insufficient permissions' });
    }

    next();
  };
};
