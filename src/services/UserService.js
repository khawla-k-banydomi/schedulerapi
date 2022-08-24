const User = require('../models/User');

class UserService {
  getOne = async (username) => {
    const user = await User.findOne({ user: username });
    if (!user) throw new NotFound('User does not exist');
    return user;
  };

  createOne = async (userObj) => {
    return await User.create(userObj);
  };
}

module.exports = UserService;
