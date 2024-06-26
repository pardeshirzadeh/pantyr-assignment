import Joi from "joi";


const createOrderSchema = Joi.object({
    products: Joi.array<number>(),
    orderedBy:Joi.string().required(),
});

export default{createOrderSchema};