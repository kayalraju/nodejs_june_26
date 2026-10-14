
const Joi = require('joi');

class ProductValidation {

    static CreateProduct=Joi.object({
          name: Joi.string().trim().required().messages({
              "string.empty": "Name is required",
              "any.required": "Name is required",
            }),
        
            description: Joi.string().trim().required().messages({
                "string.empty": "Description is required",
                "any.required": "Description is required",
            }),
        
            category: Joi.string().trim().required().messages({
                "string.empty": "Category is required",
                "any.required": "Category is required",
            }),
        
            price: Joi.number().required().messages({
                "number.empty": "Price is required",
                "any.required": "Price is required",
            }),
            image: Joi.object({
                url: Joi.string().trim().required().messages({
                    "string.empty": "Image URL is required",
                    "any.required": "Image URL is required",
                }),
            }),
        
    });

    static UpdateProduct=Joi.object({
        name: Joi.string().trim().optional().messages({
            "string.empty": "Name is required",
            "any.required": "Name is required",
        }),
    
        description: Joi.string().trim().optional().messages({
            "string.empty": "Description is required",
            "any.required": "Description is required",
        }),
    
        category: Joi.string().trim().optional().messages({
            "string.empty": "Category is required",
            "any.required": "Category is required",
        }),
    
        price: Joi.number().optional().messages({
            "number.empty": "Price is required",
            "any.required": "Price is required",
        }),
        image: Joi.object({
            url: Joi.string().trim().optional().messages({
                "string.empty": "Image URL is required",
                "any.required": "Image URL is required",
            }),
        }),
    });


    

}



module.exports=ProductValidation;