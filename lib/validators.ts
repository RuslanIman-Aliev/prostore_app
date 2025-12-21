import { z } from "zod";
import { formatNumberWithDecimal } from "./utils";

const currency = z
  .string()
  .refine((value) =>
    /^\d+(\.\d{2})?$/.test(formatNumberWithDecimal(Number(value)))
  );
//Schema for inserting a new product
export const insertProductSchema = z.object({
  name: z.string().min(3, "Product name is required"),
  slug: z.string().min(3, "Product slug is required"),
  category: z.string().min(1, "Product category is required"),
  brand: z.string().min(1, "Product brand is required"),
  description: z.string().min(1, "Product description is required"),
  stock: z.coerce.number(),
  images: z.array(z.string()).min(1, "At least one product image is required"),
  isFeatured: z.boolean(),
  banner: z.string().nullable(),
  price: currency,
});
