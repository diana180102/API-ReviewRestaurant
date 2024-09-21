import { restaurantData } from "../data/restaurantData";
import { reviewsDataRestaurant } from "../data/reviewsData";
import { ApiError } from "../middlewares/error";
import { ReviewsParams } from "../models/reviews";

export class ReviewsService {
  async getAllReviewsRestaurant(id: number) {
    const restaurant = restaurantData.getRestaurantById(id);

    if (!restaurant) {
      throw new ApiError("Restaurant not found", 404);
    }

    const data = await reviewsDataRestaurant.getAllReviewsRestaurant(id);

    return data;
  }

  async addReviewRestaurant( id:number, review:ReviewsParams):Promise<ReviewsParams>{
     
     const restaurant = restaurantData.getRestaurantById(id);
     
     if (!restaurant) {
      throw new ApiError("Restaurant not found", 404);
    } 

    const data = await reviewsDataRestaurant.addReviewRestaurant(review);
    return data;

  }
}

export const reviewsServiceRestaurant = new ReviewsService();
