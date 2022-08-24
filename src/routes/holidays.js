const express = require('express');
const HolidayController = require('../controllers/HolidayController');
const router = express.Router();

const holidayController = new HolidayController();

router.get('/:user', holidayController.getUserHolidays);

router.get('/:id/:user', holidayController.getUserHoliday);

router.post('/fixed/:user', holidayController.createFixedWeekDayHoliday);

router.post('/range/:user', holidayController.createRangedDaysHoliday);

router.patch('/:id/:user', holidayController.updateHoliday);

router.delete('/:id/:user', holidayController.deleteHoliday);

module.exports = router;
