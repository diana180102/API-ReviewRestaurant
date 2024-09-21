// service user (Lógica de negocio para operaciones de usuarios)
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User, UserInput } from '../models/user';
import { config } from '../config/config';
import { userData  } from '../data/userData';

export class UserService {
  async registerUser(userInput: UserInput): Promise<Omit<User, 'password'>> {
    const hashedPassword = await bcrypt.hash(userInput.password, 10);
    const userToCreate = {
      ...userInput,
      hashedPassword
    };

    return await userData.registerUser(userToCreate);
  }

  async loginUser(username: string, password: string): Promise<string | null> {
    const user = await userData.getUserByUsername(username);
    
    if (user && await bcrypt.compare(password, user.password)) {
      return jwt.sign(
        { id: user.id, username: user.username, role: user.role },
        config.jwt.secret,
        { expiresIn: '1h' }
      );
    }
    
    return null;
  }

  async getAllUsers(): Promise<Omit<User, 'password'>[]> {
    return await userData.getAllUsers();
  }

  async updateUser(id: number, userInput: Partial<UserInput>): Promise<User> {
    const updateData: Partial<User> = {};

    if (userInput.username) {
      updateData.username = userInput.username;
    }
    if (userInput.password) {
      updateData.password = await bcrypt.hash(userInput.password, 10);
    }
    if (userInput.role) {
      updateData.role = userInput.role;
    }

    return userData.updateUser(id, updateData);
  }


  async deleteUser(id: number): Promise<void> {
    await userData.deleteUser(id);
  }
}


export const userService = new UserService();