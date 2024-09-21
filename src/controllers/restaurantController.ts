
import { NextFunction, Request, Response } from 'express';
import { restaurantService } from '../services/restaurantService';
import { ApiError } from '../middlewares/error';
import {  restaurantUpdateSchema } from '../models/restaurant';
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
            const restaurantData = req.body;

            const validatedUpdates = restaurantUpdateSchema.parse(restaurantData);
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

    async deleteRestaurant (req:Request, res:Response, next:NextFunction){
         try {
            const idRestaurant = parseInt(req.params['id']);
            await restaurantService.deleteRestaurant(idRestaurant);
            res.status(200).json({
                ok: true,
                message: "Restaurant delete success"
            })
            
         } catch (error) {
            next(new ApiError( "error in delete restaurant data", 400));
         }
    }


}

export const restaurantController = new RestaurantController();