
import {z} from 'zod';

export const reviewsSchema = z.object({
    userId: z.number({
        required_error: "userId of user is required",
        invalid_type_error: "userId have to number"
    }),
    restaurantId: z.number ({
        required_error: "restaurantId of user is required",
        invalid_type_error: "restaurantId have to number"
    }),
    score: z.number({
        required_error: "score  is required",
        invalid_type_error: "score have to number"
    })
    .min(1, "Score must be at least 1")
    .max(5, "Rating must be at most 5"),
    title: z.string({
        required_error: "title of user is required",
        invalid_type_error: "title have to string"
    }),
    description: z.string({
        required_error: "description of user is required",
        invalid_type_error: "description have to string"
    }),
});

export interface UpdateReviewsParams {
    id: number
    fieldsToUpdate: Record<string,any>
}

export const ReviewsUpdateSchema = reviewsSchema.partial();

export type ReviewsParams = z.infer<typeof reviewsSchema>;
export type Reviews = ReviewsParams & {id: number};
