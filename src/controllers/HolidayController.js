const HolidayService = require('../services/HolidayService');

class HolidayController {
  holidayService = new HolidayService();

  // As a user I can fetch my holidays, so that I can show their details
  getUserHolidays = async (req, res) => {
    const user = req.params.user;
    const holidays = await this.holidayService.getAll(user);
    return res.send({ data: holidays, message: 'Fetched successfully' });
  };

  // As a user I can fetch a single holiday, so that I can show its details
  getUserHoliday = async (req, res) => {
    const id = req.params.id,
      user = req.params.user;
    const holiday = await this.holidayService.getOne(id, user);
    return res.send({ data: holiday, message: 'Fetched successfully' });
  };

  // As a user I can create a new recurring fixed-week-day holiday, so that I can manage my holidays
  createFixedWeekDayHoliday = async (req, res) => {
    const weekDayHoliday = { fixedWeekDay: req.body.fixedWeekDay },
      user = req.params.user;
    const holiday = await this.holidayService.createOne(user, weekDayHoliday);
    res.send({ data: holiday, message: 'Created successfully' });
  };

  // As a user I can create a new ranged-period holiday, so that I can manage my holidays
  createRangedDaysHoliday = async (req, res) => {
    const holidayRange = { startDate: req.body.startDate, endDate: req.body.endDate },
      user = req.params.user;
    const holiday = await this.holidayService.createOne(user, holidayRange);
    res.send({ data: holiday, message: 'Created successfully' });
  };

  // As a user I can update my holiday details, so that I can manage my holidays
  updateHoliday = async (req, res) => {
    const id = req.params.id,
      user = req.params.user,
      updatedObj = req.body;
    const holiday = await this.holidayService.updateOne(id, user, updatedObj);
    res.send({ data: holiday, message: 'Updated successfully' });
  };

  // As a user I can delete my holiday, so that I can manage my holidays
  deleteHoliday = async (req, res) => {
    const id = req.params.id,
      user = req.params.user;
    await this.holidayService.deleteOne(id, user);
    res.send({ message: 'Deleted successfully' });
  };
}

module.exports = HolidayController;
