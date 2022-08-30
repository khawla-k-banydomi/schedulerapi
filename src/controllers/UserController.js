const UserService = require('../services/UserService');

class UserController {
  userService = new UserService();

  // As a user I can register, so that I can benefit from this app
  register = async (req, res) => {
    try {
      const userObj = req.body;
      const user = await this.userService.createOne(userObj);
      return res.send({ data: user, message: 'Registered successfully' });
    } catch (e) {
      return res.send({ message: e.message, status: e.status });
    }
  };

  // As a user I can fetch my profile, so that I can see my profile details
  getOneUser = async (req, res) => {
    try {
      const username = req.params.user;
      const user = await this.userService.getOne(username);
      return res.send({ data: user, message: 'Fetched successfully' });
    } catch (e) {
      return res.send({ message: e.message, status: e.status });
    }
  };
}

module.exports = UserController;
