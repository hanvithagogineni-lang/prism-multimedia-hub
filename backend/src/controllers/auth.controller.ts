import { Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../config/prisma.js';
import { AuthRequest } from '../middleware/auth.js';

const JWT_SECRET = process.env.JWT_SECRET || 'prism_multimedia_jwt_super_secret_key_2026';

export const login = async (req: AuthRequest, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = await prisma.user.findUnique({
      where: { email },
      include: { role: true }
    });

    if (!user || user.status !== 'ACTIVE') {
      return res.status(401).json({ error: 'Invalid credentials or inactive account' });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Update last login
    await prisma.user.update({
      where: { id: user.id },
      data: { last_login: new Date() }
    });

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role.name },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    return res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role.name
      }
    });
  } catch (error: any) {
    console.error('Login error:', error);
    return res.status(500).json({ error: 'Internal server error during login' });
  }
};

export const logout = async (req: AuthRequest, res: Response) => {
  return res.json({ message: 'Logout successful' });
};

export const getMe = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        name: true,
        email: true,
        status: true,
        last_login: true,
        role: { select: { id: true, name: true } }
      }
    });

    return res.json({ user });
  } catch (error: any) {
    return res.status(500).json({ error: 'Failed to fetch user' });
  }
};
