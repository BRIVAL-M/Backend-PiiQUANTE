//   Pour créer un utilisateur le mot de passe doit contenir au moins 8 caractères
//   1 majuscule et 1 minuscule et 1 chiffre et 1 caractère spécial (ex: !, @, #, etc.)


const { check, validationResult } = require('express-validator');
// Use express-validator middleware in order to check the user input


const validate = [
    check('email')
        .isEmail()
        .isLength({ min: 5 })
        .withMessage('Email invalide')
        .normalizeEmail(),
    check('email')
        .matches(/^[a-zA-Z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/)
        .withMessage('Email invalide'),

    check('password')
        .isLength({ min: 8 })
        .withMessage('Le mot de passe doit contenir au moins 8 caractères'),
    check('password')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)
        .withMessage('Le mot de passe doit contenir au moins 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial (ex: !, @, #, etc.)')
]

const checkValidation = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    next();
}
module.exports = { validate, checkValidation };






















