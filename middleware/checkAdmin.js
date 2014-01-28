var HttpError = require('error').HttpError;
var User = require('models/user').User;

module.exports = function (req, res, next) {
    if (req.user.username != 'Administrator') {
        console.log(req.user.username);
        return next(new HttpError(401, "У Вас нет доступа к настройкам приложения! Обратитесь к администратору."));
    }

    next();
};