import z from "zod";

export const foodSchema = z.object({
  id: z.number(),
  name: z.string().min(1, "Name cannot be empty"),
  price: z.number().min(0, "Price must be positive"),
  description: z.string().min(1, "Description cannot be empty"),
  image: z.string().min(1, "Image URL cannot be empty"),
});

export type Food = z.infer<typeof foodSchema>;
