const HolidayService = require('../services/HolidayService');
const mongoIdRegex = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i;

class HolidayController {
  holidayService = new HolidayService();

  // As a user I can fetch my holidays, so that I can show their details
  getUserHolidays = async (req, res) => {
    try {
      const user = req.params.user;

      if (!user || user === 'null') return res.sendStatus(401);

      const holidays = await this.holidayService.getAll(user);
      if (!isNaN(holidays)) return res.sendStatus(holidays);

      return res.send({ data: holidays, message: 'Fetched successfully' });
    } catch (e) {
      return res.sendStatus(500);
    }
  };

  // As a user I can fetch a single holiday, so that I can show its details
  getUserHoliday = async (req, res) => {
    try {
      const id = req.params.id,
        user = req.params.user;

      if (!mongoIdRegex.test(id)) return res.sendStatus(400);
      if (!user || user === 'null') return res.sendStatus(401);

      const holiday = await this.holidayService.getOne(id, user);
      if (!isNaN(holiday)) return res.sendStatus(holiday);

      return res.send({ data: holiday, message: 'Fetched successfully' });
    } catch (e) {
      return res.sendStatus(500);
    }
  };

  // As a user I can create a new recurring fixed-week-day holiday, so that I can manage my holidays
  createFixedWeekDayHoliday = async (req, res) => {
    try {
      const weekDayHoliday = {
          name: req.body.name,
          fixedWeekDay: req.body.fixedWeekDay
        },
        user = req.params.user;

      if (!user || user === 'null') return res.sendStatus(401);

      const holiday = await this.holidayService.createOne(user, weekDayHoliday);
      if (!isNaN(holiday)) return res.sendStatus(holiday);

      res.send({ data: holiday, message: 'Created successfully' });
    } catch (e) {
      return res.sendStatus(500);
    }
  };

  // As a user I can create a new ranged-period holiday, so that I can manage my holidays
  createRangedDaysHoliday = async (req, res) => {
    try {
      const holidayRange = {
          name: req.body.name,
          timeStart: req.body.timeStart,
          timeEnd: req.body.timeEnd
        },
        user = req.params.user;

      if (!user || user === 'null') return res.sendStatus(401);

      const holiday = await this.holidayService.createOne(user, holidayRange);
      if (!isNaN(holiday)) return res.sendStatus(holiday);

      res.send({ data: holiday, message: 'Created successfully' });
    } catch (e) {
      return res.sendStatus(500);
    }
  };

  // As a user I can update my holiday details, so that I can manage my holidays
  updateHoliday = async (req, res) => {
    try {
      const id = req.params.id,
        user = req.params.user,
        updatedObj = req.body;

      if (!mongoIdRegex.test(id)) return res.sendStatus(400);
      if (!user || user === 'null') return res.sendStatus(401);

      const holiday = await this.holidayService.updateOne(id, user, updatedObj);
      if (!isNaN(holiday)) return res.sendStatus(holiday);

      res.send({ data: holiday, message: 'Updated successfully' });
    } catch (e) {
      return res.sendStatus(500);
    }
  };

  // As a user I can delete my holiday, so that I can manage my holidays
  deleteHoliday = async (req, res) => {
    try {
      const id = req.params.id,
        user = req.params.user;

      if (!mongoIdRegex.test(id)) return res.sendStatus(400);
      if (!user || user === 'null') return res.sendStatus(401);

      const isError = await this.holidayService.deleteOne(id, user);
      if (!isNaN(isError)) return res.sendStatus(isError);

      res.send({ message: 'Deleted successfully' });
    } catch (e) {
      console.log(e, 'Ffffffffffff');
      return res.sendStatus(500);
    }
  };
}

module.exports = HolidayController;
