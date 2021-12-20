const {body, validationResult} = require('express-validator/check');

const validators = {
userValidator: [body('password').not().isEmpty().trim().isLength({min: 5})
				.withMessage('Пароль должен состоять из более чем 5 символов!').matches(/\d/)
				.withMessage('Пароль должен состоять из цифр!')]
}

module.exports = validators;