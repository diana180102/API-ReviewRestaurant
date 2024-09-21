import { User, UserInput } from '../models/user';
import { db } from '../db';

export class UserData {
    async registerUser(userData: UserInput & { hashedPassword: string }): Promise<Omit<User, 'password'>> {
      const result = await db.query(
        'INSERT INTO users (username, password, role) VALUES ($1, $2, $3) RETURNING id, username, role',
        [userData.username, userData.hashedPassword, userData.role]
      );
      return result.rows[0];
    }

    async getUserByUsername(username: string): Promise<User | null> {
        const result = await db.query('SELECT * FROM users WHERE username = $1', [username]);
        return result.rows[0] || null;
      }
    
    async getAllUsers(): Promise<Omit<User, 'password'>[]> {
        const result = await db.query('SELECT id, username, role FROM users');
        return result.rows;
    }
    
    async updateUser(id: number, userData: Partial<User>): Promise<User> {
        const fields: string[] = [];
        const values: any[] = [];
        let query = 'UPDATE users SET ';
    
        Object.entries(userData).forEach(([key, value], index) => {
          fields.push(`${key} = $${index + 1}`);
          values.push(value);
        });
    
        query += fields.join(', ') + ' WHERE id = $' + (fields.length + 1) + ' RETURNING id, username, role';
        values.push(id);
    
        const result = await db.query(query, values);
        return result.rows[0];
    }
    
    async deleteUser(id: number): Promise<void> {
        await db.query('DELETE FROM users WHERE id = $1', [id]);
    }    
}

export const userData = new UserData();