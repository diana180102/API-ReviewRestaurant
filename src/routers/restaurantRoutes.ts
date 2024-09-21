import { Router } from "express";
import { RestaurantController } from "../controllers/restaurantController";
import { validationHandler } from "../middlewares/validation";
import { restaurantSchema } from "../models/restaurant";

const restaurantRouter = Router();
const restaurantController = new RestaurantController();

restaurantRouter.get('/restaurants', restaurantController.getAllRestaurants);
restaurantRouter.post('/restaurants', validationHandler(restaurantSchema), restaurantController.addNewRestaurant );
restaurantRouter.patch('/restaurants/:id', validationHandler(restaurantSchema), restaurantController.updateRestaurant );


export default restaurantRouter;

