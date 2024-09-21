

import { db } from "../db";
import { ApiError } from "../middlewares/error";
import { Restaurant, RestaurantParams, UpdateRestaurantParams } from "../models/restaurant";


export class RestaurantData{
    
    async getAllRestaurants() {
       
     const consult = `SELECT * FROM restaurant;`;

        try {
        const data = await db.query(consult);
        return data.rows;
        } catch (error) {
        //    console.error("Error al ejecutar consulta SQL:", error);
        throw new ApiError("Error in execute query", 400, error as Record<string, any>); 
        }
    
    }

    async getRestaurantById(id: number): Promise<Restaurant | null> {
    const result = await db.query("SELECT * FROM restaurants WHERE id = $1", [id]);
    return result.rows.length ? result.rows[0] : null;
}

    async addNewRestaurant(restaurant:RestaurantParams):Promise<Restaurant>{
         const {name, address, category} = restaurant;
        
        const insert = `INSERT INTO restaurant (name, address, category) VALUES ($1, $2, $3) RETURNING *;`
        try{
            const query = await db.query(insert, [name, address, category] );
            return query.rows[0];
        }catch(error){
            console.error("Error in execute query to add new restaurant:", error);
            throw new ApiError("Error in execute query to add new restaurant", 400);
        }
    }

    async updateRestaurant({id, fieldsToUpdate}:UpdateRestaurantParams):Promise<Restaurant>{
       

       if(!id || Object.keys(fieldsToUpdate).length === 0){
         throw new ApiError("id and fieldsToUpdate are required", 400);
       }

       //Convert fields in Object of key and value
       const entries = Object.entries(fieldsToUpdate);
       
       //path for ever key/field
       const setClauses = entries.map(([key, _], index) =>
         `${key} = $${index+1}`);

       const updateData = `UPDATE restaurants SET ${setClauses.join(",")} 
                           WHERE id = $${entries.length + 1} RETURNING *; `; 

       const params = [...entries.map(([_, value]) => value), id];

       const result = await db.query(updateData, params);
       
       return result.rows[0];
    }
    

}

export const restaurantData = new RestaurantData();
