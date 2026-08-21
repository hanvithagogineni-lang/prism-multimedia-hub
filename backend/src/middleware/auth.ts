import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from '../config/prisma.js';

export interface AuthRequest extends Request {
  user?: {
    id: number;
    email: string;
    roleId: number;
    roleName: string;
  };
}

const JWT_SECRET = process.env.JWT_SECRET || 'prism_multimedia_jwt_super_secret_key_2026';

export const authenticateToken = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: Access token missing' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    const user = await prisma.user.findUnique({
      where: { id: Number(decoded.id) },
      include: { role: true }
    });

    if (!user || user.status !== 'ACTIVE') {
      return res.status(403).json({ error: 'Forbidden: Account inactive or invalid' });
    }

    req.user = {
      id: user.id,
      email: user.email,
      roleId: user.role_id,
      roleName: user.role.name
    };

    next();
  } catch (err) {
    return res.status(403).json({ error: 'Forbidden: Token invalid or expired' });
  }
};

export const requireRole = (allowedRoles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    if (req.user.roleName === 'SUPER_ADMIN' || allowedRoles.includes(req.user.roleName)) {
      return next();
    }

    return res.status(403).json({ error: 'Forbidden: Insufficient permissions' });
  };
};
