const Joi = require('joi');

exports.userValidation = async (values) => {

    const signupValidation = Joi.object({
        name: Joi.string().alphanum().min(3).max(30).required(),
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        password: Joi.string(),
        number: Joi.number().integer().min(1000000000).max(9999999999) // Ensure it's a 10-digit integer
            .required()
            .messages({
                'number.base': 'Number must be a valid numeric value',
                'number.integer': 'Number must be an integer',
                'number.min': 'Number must be exactly 10 digits',
                'number.max': 'Number must be exactly 10 digits'
            }),
        role: Joi.string().valid('User', 'Creater').required().messages({
            'role.valid': 'Role must be either "User" or "Creater"'
        }) // Enum with two values
    });

    return signupValidation.validate(values);
}

exports.loginValidation = async (values) => {
    const loginValidation = Joi.object({
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
        password: Joi.string().required()
    });

    return loginValidation.validate(values);
}
