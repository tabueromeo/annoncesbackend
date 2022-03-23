const account = require('../model/User');

module.exports = function (app) {
    app.get('/login',account.login);
    app.post('/signup',account.signup);
}