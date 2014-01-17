var checkAuth = require('middleware/checkAuth');

module.exports = function(app){

    app.get('/portal', checkAuth, require('./mainpage').get);

    app.get('/', require('./login').get);

    app.post('/login', require('./login').post);

    app.post('/logout', require('./logout').post);

    app.get('/session', require('./session').get);

    app.get('/device', require('./devices').get);

//    app.get('/device/:id', require('./deviceid').get);

}
