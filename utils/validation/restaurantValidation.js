const Joi = require('joi');

exports.restaurantValidation = async (values) => {
    const restaurantValidation = Joi.object({
        name: Joi.string().required(),
        price: Joi.number().required(),
        address: Joi.string().required(),
        imageFile: Joi.string().uri(), // Assuming this is the URL of the image file
        token: Joi.string().required() // Assuming this is some form of authentication token
    });

    return restaurantValidation.validate(values);
}
