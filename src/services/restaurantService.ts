
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

  async deleteRestaurant (id:number){
     
     const existingRestaurant = await restaurantData.getRestaurantById(id);
      if (!existingRestaurant) {
            throw new ApiError("Restaurant not found", 404);
        }

      if(!id){
        throw new ApiError("id is required", 404);
      } 

      const deleteData = await restaurantData.deleteRestaurant(id);
      return deleteData; 
  }

}

export const restaurantService = new RestaurantService();