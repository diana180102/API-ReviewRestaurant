// service user (Lógica de negocio para operaciones de usuarios)
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User, UserInput } from '../data/userData';
import { db } from '../db';
import { config } from '../config/config';

export class UserService {
  async registerUser(userData: UserInput): Promise<Omit<User, 'password'>> {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const result = await db.query(
      'INSERT INTO users (username, password, role) VALUES ($1, $2, $3) RETURNING id, username, role',
      [userData.username, hashedPassword, userData.role]
    );
    return result.rows[0];
  }

  async loginUser(username: string, password: string): Promise<string | null> {
    const result = await db.query('SELECT * FROM users WHERE username = $1', [username]);
    const user = result.rows[0];
    if (user && await bcrypt.compare(password, user.password)) {
      return jwt.sign({ id: user.id, username: user.username, role: user.role }, config.jwt.secret, { expiresIn: '1h' });
    }
    return null;
  }
  async getAllUsers(): Promise<User[]> {
    const result = await db.query('SELECT id, username, role FROM users');
    return result.rows;
  }

  async updateUser(id: number, userData: Partial<UserInput>): Promise<User> {
    const fields = [];
    const values = [];
    let query = 'UPDATE users SET ';

    if (userData.username) {
      fields.push('username = $' + (fields.length + 1));
      values.push(userData.username);
    }
    if (userData.password) {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      fields.push('password = $' + (fields.length + 1));
      values.push(hashedPassword);
    }
    if (userData.role) {
      fields.push('role = $' + (fields.length + 1));
      values.push(userData.role);
    }

    query += fields.join(', ') + ' WHERE id = $' + (fields.length + 1) + ' RETURNING id, username, role';
    values.push(id);

    const result = await db.query(query, values);
    return result.rows[0];
  }

  async deleteUser(id: number): Promise<void> {
    await db.query('DELETE FROM users WHERE id = $1', [id]);
  }
}


export const userService = new UserService();