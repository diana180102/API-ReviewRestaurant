import { Router } from "express";
import { ReviewsController } from "../controllers/reviewsController";
import { authMiddleware } from "../middlewares/authentication";
import { authorize } from "../middlewares/authorize";


const reviewsRouter = Router();
const reviewsController = new ReviewsController();

reviewsRouter.get('/:id/reviews', authMiddleware, authorize('admin','user'), reviewsController.getAllReviewsRestaurant);
reviewsRouter.post('/:id/reviews', authMiddleware, authorize('admin'), reviewsController.addReviewRestaurant);
reviewsRouter.put('/reviews/:id', authMiddleware, authorize('admin'), reviewsController.updateReviewRestaurant);
reviewsRouter.delete('/reviews/:id', authMiddleware, authorize('admin'), reviewsController.deleteReviewRestaurant);


export default reviewsRouter;