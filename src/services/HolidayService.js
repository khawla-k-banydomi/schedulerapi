const { NotFound } = require('http-errors');
const Holiday = require('../models/Holiday');

class HolidayService {
  getAll = async (user) => {
    const holidays = await Holiday.find({ user });
    return holidays;
  };

  getOne = async (id, user) => {
    const holiday = await Holiday.findOne({ id, user });
    if (!holiday) throw new NotFound('Holiday does not exist');
    return holiday;
  };

  createOne = async (user, holidayObj) => {
    const holiday = await Holiday.create({ user, ...holidayObj });
    return holiday;
  };

  updateOne = async (id, user, updatedObj) => {
    const holiday = await Holiday.updateOne({ id, user }, { $set: updatedObj });
    if (!holiday) throw new NotFound('Holiday does not exist');
    return holiday;
  };

  deleteOne = async (id, user) => {
    const holiday = await Holiday.deleteOne({ id, user });
    if (!holiday) throw new NotFound('Holiday does not exist');
  };
}

module.exports = HolidayService;
