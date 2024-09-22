import { NextFunction, Request, Response } from "express";
import { reviewsServiceRestaurant } from "../services/reviewsService";
import { ReviewsParams, reviewsSchema, ReviewsUpdateSchema } from "../models/reviews";
import { ApiError } from "../middlewares/error";

export class ReviewsController {
  async getAllReviewsRestaurant(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;

      const data = await reviewsServiceRestaurant.getAllReviewsRestaurant(
        Number(id)
      );

      res.status(200).json({
        ok: "true",
        message: "List of Reviews of restaurant",
        data: data,
      });
    } catch (error) {
      next(error);
    }
  }

  async addReviewRestaurant(req: Request, res: Response, next: NextFunction) {
    try {
        const {id} = req.params;
        const review:ReviewsParams = req.body;
        const validatedData = reviewsSchema.parse({...review, restaurantId: Number(id)});
        
        const addReview = await reviewsServiceRestaurant.addReviewRestaurant(Number(id), validatedData);

       res.status(200).json({
         ok: "true",
         message: "Review add success",
         data: addReview
       })  

    } catch (error) {
        next(new ApiError("Error in add review", 400));
    }
  }

  async updateReviewRestaurant(req:Request, res:Response, next:NextFunction){
    try {
        
        const {id} = req.params;
        const restaurantReviewData = req.body;

        const validatedUpdates = ReviewsUpdateSchema.parse(restaurantReviewData);
        const updateR = await reviewsServiceRestaurant.updateReviewRestaurant(Number(id), validatedUpdates);
        
        res.status(200).json({
         ok: true,
         message: "Update data of review",
         data: updateR
      });

    } catch (error) {
        next(error);
    }
  }

  async deleteReviewRestaurant (req:Request, res:Response, next:NextFunction){
     try {
        const id = parseInt(req.params['id']);
        await reviewsServiceRestaurant.deleteReviewRestaurant(id);
        res.status(200).json({
            ok: true,
            message: "Review delete success"
        })
        
     } catch (error) {
        next(new ApiError( "error in delete review data", 400));
     }
  }
}

export const reviewsController = new ReviewsController();
