const express = require('express');
const { bookings } = require('../data/data-bookings');
const webSocketService = require('../services/webSocketService');
const {
  bookingValidationRules,
  validate,
} = require('../middlewares/bookingValidation');
const { isDateInCurrentMonth } = require('../helpers/helpers');

const router = express.Router();

router.get('/bookings', (req, res) => {
  res.json(bookings);
});

router.get('/bookings/current-month', (req, res) => {
  const currentMonthBookings = bookings.filter((booking) =>
    isDateInCurrentMonth(booking.startDate)
  );
  res.json(currentMonthBookings);
});

router.post('/bookings', bookingValidationRules, validate, (req, res) => {
  console.log('IN ');
  const { id, numberOfPersons, startDate, startTime, endDate, endTime } =
    req.body;

  const newBooking = {
    id,
    numberOfPersons,
    startDate,
    startTime,
    endDate,
    endTime,
  };

  bookings.push(newBooking);

  webSocketService.sendMessage('newBooking', newBooking);

  res.status(201).json(newBooking);
});

module.exports = router;
