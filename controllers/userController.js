const account = require('../model/User');

module.exports = function (app) {
    app.post('/login',account.login);
    app.post('/signup',account.signup);
}