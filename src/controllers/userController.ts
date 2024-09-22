// controllers user (Lógica de control para operaciones de usuarios)

import { Request, Response } from 'express';
import { userService } from '../services/userService';
import { UserSchema } from '../models/user';

export class UserController {
  async register(req: Request, res: Response) {
    try {
      const userData = UserSchema.parse(req.body);
      const user = await userService.registerUser(userData);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: 'Invalid input' });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { username, password } = req.body;
      const token = await userService.loginUser(username, password);
      if (token) {
        res.json({ token });
      } else {
        res.status(401).json({ error: 'Invalid credentials' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  }

  async getAllUsers(req: Request, res: Response) {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
        } catch (error) {
        res.status(500).json({ error: 'Server error' });
        }
    };

  async updateUser(req: Request, res: Response) {
    try {
        const userId = parseInt(req.params['id'], 10); // Convertir id a número
        const updatedUser = await userService.updateUser(userId, req.body);
        res.status(200).json(updatedUser);
        } catch (error) {
        res.status(500).json({ error: 'Server error' });
        }
    };
    
  async deleteUser(req: Request, res: Response) {
    try {
        const userId = parseInt(req.params['id'], 10); // Convertir id a número
        await userService.deleteUser(userId);
        res.status(204).send();
        } catch (error) {
        res.status(500).json({ error: 'Server error' });
        }
    }
}

export const userController = new UserController();