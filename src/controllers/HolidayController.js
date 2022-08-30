const HolidayService = require('../services/HolidayService');

class HolidayController {
  holidayService = new HolidayService();

  // As a user I can fetch my holidays, so that I can show their details
  getUserHolidays = async (req, res) => {
    try {
      const user = req.params.user;
      const holidays = await this.holidayService.getAll(user);
      return res.send({ data: holidays, message: 'Fetched successfully' });
    } catch (e) {
      return res.send({ message: e.message, status: e.status });
    }
  };

  // As a user I can fetch a single holiday, so that I can show its details
  getUserHoliday = async (req, res) => {
    try {
      const id = req.params.id,
        user = req.params.user;
      const holiday = await this.holidayService.getOne(id, user);
      return res.send({ data: holiday, message: 'Fetched successfully' });
    } catch (e) {
      return res.send({ message: e.message, status: e.status });
    }
  };

  // As a user I can create a new recurring fixed-week-day holiday, so that I can manage my holidays
  createFixedWeekDayHoliday = async (req, res) => {
    try {
      const weekDayHoliday = { name: req.body.name, fixedWeekDay: req.body.fixedWeekDay },
        user = req.params.user;
      const holiday = await this.holidayService.createOne(user, weekDayHoliday);
      res.send({ data: holiday, message: 'Created successfully' });
    } catch (e) {
      return res.send({ message: e.message, status: e.status });
    }
  };

  // As a user I can create a new ranged-period holiday, so that I can manage my holidays
  createRangedDaysHoliday = async (req, res) => {
    try {
      const holidayRange = {
          name: req.body.name,
          startDate: req.body.startDate,
          endDate: req.body.endDate
        },
        user = req.params.user;
      const holiday = await this.holidayService.createOne(user, holidayRange);
      res.send({ data: holiday, message: 'Created successfully' });
    } catch (e) {
      return res.send({ message: e.message, status: e.status });
    }
  };

  // As a user I can update my holiday details, so that I can manage my holidays
  updateHoliday = async (req, res) => {
    try {
      const id = req.params.id,
        user = req.params.user,
        updatedObj = req.body;
      const holiday = await this.holidayService.updateOne(id, user, updatedObj);
      res.send({ data: holiday, message: 'Updated successfully' });
    } catch (e) {
      return res.send({ message: e.message, status: e.status });
    }
  };

  // As a user I can delete my holiday, so that I can manage my holidays
  deleteHoliday = async (req, res) => {
    try {
      const id = req.params.id,
        user = req.params.user;
      await this.holidayService.deleteOne(id, user);
      res.send({ message: 'Deleted successfully' });
    } catch (e) {
      return res.send({ message: e.message, status: e.status });
    }
  };
}

module.exports = HolidayController;
