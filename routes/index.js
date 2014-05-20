var checkAuth = require('middleware/checkAuth');
var checkAdmin = require('middleware/checkAdmin');

module.exports = function (app) {

  app.get('/portal', require('./mainpage').get);

  app.get('/', require('./login').get);

  app.post('/login', require('./login').post);

  app.post('/logout', require('./logout').post);

  app.post('/incident', require('./incident').post);

  app.get('/settings', checkAdmin, require('./settings').get);

  app.get('/session', require('./session').get);

  app.get('/device', require('./devices').get);

  app.get('/ping', require('./ping').get);

  app.get('/info', require('./info').get);

  app.get('/unavailableNode', require('./unavailableNode').get);

  app.get('/unavailableChanel', require('./unavailableChanel').get);

  app.get('/wislachanel', require('./wislaChanel').get);

  //    app.get('/device/:id', require('./deviceid').get);
}