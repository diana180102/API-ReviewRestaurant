
import { NextFunction, Request, Response } from 'express';
import { restaurantService } from '../services/restaurantService';
import { ApiError } from '../middlewares/error';
import { Restaurant, restaurantSchema } from '../models/restaurant';
export class RestaurantController {
    async getAllRestaurants(req:Request, res:Response, next:NextFunction){
        try {
            const data = await restaurantService.getAllRestaurants();
            res.status(200).json({
                ok: true,
                message: "List of restaurant",
                data: data
            });
        } catch (error) {
           next(new ApiError("No found list of restaurant", 401));
        }
    }


    async addNewRestaurant(req:Request, res:Response, next:NextFunction){
        try {
          
          const newRestaurant = await restaurantService.addNewRestaurant(req.body);
           res.status(200).json({
             ok: true,
             message: "Add new restaurant",
             data: newRestaurant
          });
        } catch (error) {
            next(error); 
        }
    }


    async updateRestaurant(req:Request, res:Response, next:NextFunction){
       

        try {
            
            const {id} = req.params;
            const restaurantData:Restaurant = req.body;

            const validatedUpdates = restaurantSchema.partial().parse(restaurantData);
            const updateR = await restaurantService.updateRestaurant(Number(id), validatedUpdates);
            
            res.status(200).json({
             ok: true,
             message: "Update data of restaurant",
             data: updateR
          });

        } catch (error) {
            next(error);
        }
    }


}

export const restaurantController = new RestaurantController();