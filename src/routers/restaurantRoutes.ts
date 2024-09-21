import { Router } from "express";
import { RestaurantController } from "../controllers/restaurantController";
import { validationHandler } from "../middlewares/validation";
import { restaurantSchema, restaurantUpdateSchema } from "../models/restaurant";

const restaurantRouter = Router();
const restaurantController = new RestaurantController();

restaurantRouter.get('/restaurants', restaurantController.getAllRestaurants);
restaurantRouter.post('/restaurants', validationHandler(restaurantSchema), restaurantController.addNewRestaurant );
restaurantRouter.patch('/restaurants/:id', validationHandler(restaurantUpdateSchema), restaurantController.updateRestaurant );
restaurantRouter.delete('/restaurants/:id', restaurantController.deleteRestaurant);


export default restaurantRouter;

