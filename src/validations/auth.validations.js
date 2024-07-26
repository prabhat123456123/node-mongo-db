const Joi = require('joi')

const validateSignup = async (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(4).required(),
        role: Joi.string().valid("USER",'ADMIN'),
    })
    const { error, value } = schema.validate(req.body);
    if (error) {
        console.log(error);
        return res.status(400).json({
            message: error.details[0].message,
            status:400
        })
    }
    return next();
}

module.exports = {validateSignup}