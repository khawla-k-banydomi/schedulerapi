const Holiday = require('../models/Holiday');

class HolidayService {
  getAll = async (user) => {
    if (!user) return 401;
    const holidays = await Holiday.find({ user });
    return holidays;
  };

  getOne = async (id, user) => {
    if (!user) return 401;
    const holiday = await Holiday.findOne({ _id: id, user });
    if (!holiday) return 404;
    return holiday;
  };

  createOne = async (user, holidayObj) => {
    if (!user) return 401;
    const holiday = await Holiday.create({ user, ...holidayObj });
    return holiday;
  };

  updateOne = async (id, user, updatedObj) => {
    if (!user) return 401;
    const holiday = await Holiday.findOne({ _id: id, user });
    if (!holiday) return 404;
    const newHoliday = await Holiday.findOneAndUpdate(
      { _id: id, user },
      { $set: updatedObj },
      { new: true }
    );
    if (!newHoliday) return 404;
    return newHoliday;
  };

  deleteOne = async (id, user) => {
    if (!user) return 401;
    const holiday = await Holiday.findOne({ _id: id, user });
    if (!holiday) return 404;
    await Holiday.deleteOne({ _id: id, user });
  };
}

module.exports = HolidayService;
