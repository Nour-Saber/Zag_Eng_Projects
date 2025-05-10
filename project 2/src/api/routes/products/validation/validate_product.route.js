import joi from "joi";
export const CreateProductSchema = joi.object({
  name: joi.string().strict().required().max(120),
  price: joi.number().required().min(0),
  brand: joi.string().strict().required(),
  description: joi.string().strict().required(),
  category: joi.string().strict().required(),
  stock: joi.number().required(),
});
