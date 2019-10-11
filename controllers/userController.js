const User = require("./../models/userModel");

module.exports = {
  getUser: async (req, res, next) => {
    const user = User.findById(req.params.id);
    if (!user) return new AppError("");
  }
};
