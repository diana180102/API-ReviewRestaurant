import { db } from "../db";
import { ApiError } from "../middlewares/error";
import { ReviewsParams, UpdateReviewsParams } from "../models/reviews";

export class ReviewsData {
    async getAllReviewsRestaurant(id:number){
       const consultData = `SELECT  r.name, u.username, rw.score, rw.title, rw.description FROM reviews AS rw
                            INNER JOIN users AS u ON rw.userid = u.id 
                            INNER JOIN restaurant AS r ON rw.restaurantid = r.id
                            WHERE rw.restaurantid = $1;`;

     const result = await db.query(consultData,[id]);
       
      return result.rows;
    }

    async addReviewRestaurant(review:ReviewsParams): Promise<ReviewsParams>{
       
       const insertReview = `INSERT INTO reviews (userid, restaurantid, score, title, description) 
                              VALUES ($1, $2, $3, $4, $5) RETURNING *;`;

       const params = [review.userId, review.restaurantId, review.score, review.title, review.description];

       const result = await db.query(insertReview, params );

         return result.rows[0];
    }

    async updateReviewRestaurant({id, fieldsToUpdate}:UpdateReviewsParams): Promise<ReviewsParams>{
       
      if(!id || Object.keys(fieldsToUpdate).length === 0){
         throw new ApiError("id and fieldsToUpdate are required", 400);
       }

       //Convert fields in Object of key and value
       const entries = Object.entries(fieldsToUpdate);
       
       //path for ever key/field
       const setClauses = entries.map(([key, _], index) =>
         `${key} = $${index+1}`);

       const updateData = `UPDATE reviews SET ${setClauses.join(",")} 
                           WHERE id = $${entries.length + 1} RETURNING *; `; 

       const params = [...entries.map(([_, value]) => value), id];

       const result = await db.query(updateData, params);
       
       return result.rows[0];
   }

   async deleteReviewRestaurant(id:number){
        
      const deleteData = `DELETE FROM reviews WHERE id = $1;`;

      try {
          return await db.query(deleteData, [id]);
      } catch (error) {
           throw new ApiError("Error in delete Data of reviews", 400);
      }
  }
}

export const reviewsDataRestaurant = new ReviewsData(); 