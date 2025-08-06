const message = require("../message/message");
const statusCode = require("../statusCode/statusCode");
const HandleError = require("../utils/handleError");

const roleBased = (...role) => {
  return (req, res, next) => {
    if (!role.includes(req.user.role)) {
      return next(new HandleError(message.NOT_ALLOWED, statusCode.FORBIDEN));
    }
    next();
  };
};

module.exports = roleBased;
