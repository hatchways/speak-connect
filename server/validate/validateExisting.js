const Joi = require("joi");

const validateInput = input => {

    const userSchema = {

        email: Joi.string().min(5).required(),
        password: Joi.string().min(6).required()
    };

    const result = Joi.validate(input, userSchema);

    return result.error

}

module.exports = validateInput;