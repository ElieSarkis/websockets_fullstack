const { body, validationResult } = require('express-validator');

const bookingValidationRules = [
  body('id').isInt().withMessage('ID must be an integer'),
  body('numberOfPersons')
    .isInt()
    .withMessage('Number of persons must be an integer'),
  body('startDate').isISO8601().withMessage('Start date must be a valid date'),
  body('startTime')
    .matches(/^\d{2}:\d{2}$/)
    .withMessage('Start time must be in HH:MM format'),
  body('endDate').isISO8601().withMessage('End date must be a valid date'),
  body('endTime')
    .matches(/^\d{2}:\d{2}$/)
    .withMessage('End time must be in HH:MM format'),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  bookingValidationRules,
  validate,
};
