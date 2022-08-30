const { NotFound, Unauthorized } = require('http-errors');
const Holiday = require('../models/Holiday');

class HolidayService {
  getAll = async (user) => {
    if (!user) throw new Unauthorized('Unauthorized');
    const holidays = await Holiday.find({ user });
    return holidays;
  };

  getOne = async (id, user) => {
    if (!user) throw new Unauthorized('Unauthorized');
    const holiday = await Holiday.findOne({ id, user });
    if (!holiday) throw new NotFound('Holiday does not exist');
    return holiday;
  };

  createOne = async (user, holidayObj) => {
    if (!user) throw new Unauthorized('Unauthorized');
    const holiday = await Holiday.create({ user, ...holidayObj });
    return holiday;
  };

  updateOne = async (id, user, updatedObj) => {
    if (!user) throw new Unauthorized('Unauthorized');
    const holiday = await Holiday.findOne({ id, user });
    if (!holiday) throw new NotFound('Holiday does not exist');
    const newHoliday = await Holiday.findOneAndUpdate(
      { id, user },
      { $set: updatedObj },
      { new: true }
    );
    if (!newHoliday) throw new NotFound('Holiday does not exist');
    return newHoliday;
  };

  deleteOne = async (id, user) => {
    if (!user) throw new Unauthorized('Unauthorized');
    const holiday = await Holiday.findOne({ id, user });
    if (!holiday) throw new NotFound('Holiday does not exist');
    await Holiday.deleteOne({ id, user });
  };
}

module.exports = HolidayService;
