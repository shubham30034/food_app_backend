const Joi = require('joi');

exports.restaurantValidation = async (values) => {
    const restaurantValidation = Joi.object({
        name: Joi.string().required(),
        price: Joi.number().required(),
        address: Joi.string().required(),
        imageFile: Joi.string().uri(), // Assuming this is the URL of the image file
       
    });

    return restaurantValidation.validate(values);
}
