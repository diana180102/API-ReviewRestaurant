import { db } from "../db";
import { ReviewsParams } from "../models/reviews";

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
        
       const params = [[review.userId, review.restaurantId, review.score, review.title, review.description]];
       const result = await db.query(insertReview, params );

       return result.rows[0];
        
        
    }
}

export const reviewsDataRestaurant = new ReviewsData(); 