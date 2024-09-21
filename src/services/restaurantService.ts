import { restaurantData } from "../data/restaurantData";
import { ApiError } from "../middlewares/error";
import { Restaurant, RestaurantParams } from "../models/restaurant";


export class RestaurantService{
 async  getAllRestaurants(){
   return await restaurantData.getAllRestaurants();
 }

 async addNewRestaurant(restaurant:RestaurantParams):Promise<Restaurant>{
     return await restaurantData.addNewRestaurant(restaurant);
 }

 async updateRestaurant(id:number, restaurant:Partial<Restaurant>){
    
    const restaurants = {
      id,
      fieldsToUpdate : restaurant
    }

    const existingRestaurant = await restaurantData.getRestaurantById(id);
        if (!existingRestaurant) {
            throw new ApiError("Restaurant not found", 404);
        }

    const updateData:Restaurant = await restaurantData.updateRestaurant(restaurants);
    return updateData;
 }

}

export const restaurantService = new RestaurantService();