const { body, query, validationResult } = require("express-validator");

const validateCreateOrder = [
    body('name').notEmpty().withMessage('Name is required'),
    body('email')
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Invalid email"),
    body('phone')
        .notEmpty().withMessage("Phone number is required")
        .matches(/^\d{10}$/).withMessage("Phone number must contain only 10 digits"),
    body('address').notEmpty().withMessage("Address is required"),
    body('productIds').isArray({ min: 1 }).withMessage("No products linked with this order"),
    body('totalPrice').isFloat({ min: 0.01 }).withMessage("Total price should be valid and greater than 0.01"),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

const validateOrderByEmail = [
    query('email')
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Invalid email"),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
]

module.exports = {
    validateCreateOrder,
    validateOrderByEmail
};