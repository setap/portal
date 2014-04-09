var log = require('lib/log')(module);
var fs = require('fs');
var config = require('config');
var domain = require('domain');

var d = domain.create();

d.on('error', function (err) {
  log.error('Socket domain error handler ' + err);
})

module.exports = function (server) {

  d.run(function () {

    var io = require('socket.io').listen(server);
    io.set('log level', 0);
    io.set('origins', '*:*')

    io.sockets.on('connection', function (socket) {
    });

    setInterval(function () {

      //require('dataload/devices').getDevices(io);
      require('dataload/incidents').getIncidents(io);
      require('dataload/ncim').getNCIMData(io);
      require('dataload/netcool').getNetcoolData(io);
      require('dataload/wisla').getWislaData(io);

    }, config.get('refreshInterval') * 1000);

  })

}
