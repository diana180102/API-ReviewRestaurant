import { Router } from "express";
import { RestaurantController } from "../controllers/restaurantController";
import { validationHandler } from "../middlewares/validation";
import { restaurantSchema, restaurantUpdateSchema } from "../models/restaurant";
import { authMiddleware } from "../middlewares/authentication";
import { authorize } from "../middlewares/authorize";

const restaurantRouter = Router();
const restaurantController = new RestaurantController();

restaurantRouter.get('/restaurants', authMiddleware, authorize('admin','user'), restaurantController.getAllRestaurants);
restaurantRouter.post('/restaurants',  authMiddleware, authorize('admin'), validationHandler(restaurantSchema), restaurantController.addNewRestaurant );
restaurantRouter.patch('/restaurants/:id',  authMiddleware, authorize('admin'),  validationHandler(restaurantUpdateSchema), restaurantController.updateRestaurant );
restaurantRouter.delete('/restaurants/:id',  authMiddleware, authorize('admin'),  restaurantController.deleteRestaurant);


export default restaurantRouter;

