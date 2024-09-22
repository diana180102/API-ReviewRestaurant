import { restaurantData } from "../data/restaurantData";
import { reviewsDataRestaurant } from "../data/reviewsData";
import { ApiError } from "../middlewares/error";
import { ReviewsParams } from "../models/reviews";

export class ReviewsService {
  async getAllReviewsRestaurant(id: number) {
    const restaurant = await restaurantData.getRestaurantById(id);

    if (!restaurant) {
      throw new ApiError("Restaurant not found", 404);
    }

    const data = await reviewsDataRestaurant.getAllReviewsRestaurant(id);

    return data;
  }

  async addReviewRestaurant( id:number, review:ReviewsParams):Promise<ReviewsParams>{
     
     const restaurant = await restaurantData.getRestaurantById(id);
     
     if (!restaurant) {
      throw new ApiError("Restaurant not found", 404);
    } 

    const data = await reviewsDataRestaurant.addReviewRestaurant(review);
    return data;

  }

  async updateReviewRestaurant(id:number, reviewInput:Partial<ReviewsParams>){
    
    const reviewUpdate = {
      id,
      fieldsToUpdate : reviewInput
    }

    const existingRestaurant = await restaurantData.getRestaurantById(id);
        if (!existingRestaurant) {
            throw new ApiError("Restaurant not found", 404);
        }

    const updateData:ReviewsParams = await reviewsDataRestaurant.updateReviewRestaurant(reviewUpdate);
    return updateData;
 }

 async deleteReviewRestaurant (id:number){
     
  const existingRestaurant = await restaurantData.getRestaurantById(id);
   if (!existingRestaurant) {
         throw new ApiError("Restaurant not found", 404);
     }

   if(!id){
     throw new ApiError("id is required", 404);
   } 

   const deleteData = await reviewsDataRestaurant.deleteReviewRestaurant(id);
   return deleteData; 
  }
}

export const reviewsServiceRestaurant = new ReviewsService();
