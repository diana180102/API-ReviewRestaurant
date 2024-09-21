import {z} from 'zod';

export const restaurantSchema = z.object({
    name: z.string({
        required_error: "name of restaurant is required",
        invalid_type_error: "name have to string"
    }),
    address: z.string ({
        required_error: "address of restaurant is required",
        invalid_type_error: "address have to string"
    }),
    category: z.string({
        required_error: "category of restaurant is required",
        invalid_type_error: "category have to string"
    })
});


export interface UpdateRestaurantParams {
    id: number
    fieldsToUpdate: Record<string,any>
}

export const restaurantUpdateSchema = restaurantSchema.partial();

export type RestaurantParams = z.infer<typeof restaurantSchema>;
export type Restaurant = RestaurantParams & {id: number};