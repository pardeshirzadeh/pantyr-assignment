import Joi from "joi";


const createProductSchema = Joi.object({

    title:Joi.string().required(),
    price:Joi.number().required(),
});

export default{createProductSchema};