import z from "zod";

export const newFoodSchema = z.object({
  name: z.string().min(1, "Name cannot be empty"),
  price: z.number().min(0, "Price must be positive"),
  description: z.string().min(1, "Description cannot be empty"),
  image: z.string().min(1, "Image URL cannot be empty"),
  tags: z.array(z.string()),
});

export const foodSchema = newFoodSchema.extend({
  id: z.number(),
});

export type Food = z.infer<typeof foodSchema>;
export type NewFood = z.infer<typeof newFoodSchema>;
